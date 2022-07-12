const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

//TODO: Tom//
/////SAMPLE FROM MINIPROJECT////
// const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
    const newUser = req.body;
    //this will hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // this will create the newUser with hashed password and save to DB
    const userData = await User.create(newUser);
    res.status(200).json(userData);
    } catch (err) {
    res.status(400).json(err);
    }
});

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
