require("dotenv").config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const multer = require('multer');
const uuid = require('uuid').v4;

const sequelize = require('./config/connection');
const { s3Uploadv2 } = require("./s3Service");
const { Child } = require("./models");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ 
  helpers: {
    objToList: function(context) {
      function toList(obj, indent) {
        var res=""
        for (var k in obj) { 
            if (obj[k] instanceof Object) {
                res=res+k+"\n"+toList(obj[k], ("   " + indent)) ;
            }
            else{
                res=res+indent+k+" : "+obj[k]+"\n";
            }
        }
        return res;
      }    
      return toList(context,"");
    },
    json: function(context) {
      return JSON.stringify(context);
    }
  }
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//USES LOCAL STORAGE ONLY - NOT NEEDED FOR AWS UPLOADS
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   //renaming functionality for storing upload
//    filename: (req, file, cb) => {
//     //destructures name from file type
//     const { originalname } = file;
//     //creates a new randomized id and concatinates with originalname
//     cb(null, `${uuid()}-${originalname}`);
//    }
// })

//Stores file in memory
const storage = multer.memoryStorage();

//checks to make sure upload is an image file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true)
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage, 
  fileFilter, 
  //limits file size to 1MB
  limits: {fileSize: 1000000} });

//upload functionality on a post request through/upload for a single image
app.post("/upload/", upload.single("image"), async (req, res) => {
  try {
    const result = await s3Uploadv2(req.file);
    const newProfileImage = result.Location;
    //updates the child profile image url in the db
    Child.update({
      profileImage: newProfileImage,
    },
    {
      where: {
        //TODO needs to reference child id req.params.id
        //currently hard coded
        id: 6,
      }
    })
    // return res.json({status: "success", result });
    console.log(result);
    res.redirect('/api/children/');
  } catch (err) {
    console.log(err)
  }
});

app.use((error, req, res, next) => {
  //multer error return for file size
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large"
      })
    }
    //error for file count limit exceeding 1 file
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "More than one file selected"
      })
    }
    //error for unexpected file type
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image"
      })
    }
  };
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
