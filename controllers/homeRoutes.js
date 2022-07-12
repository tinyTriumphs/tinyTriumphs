const router = require('express').Router();

/////SAMPLE FROM MINI PROJECT/////
// const { Project, User } = require('../models');
// const withAuth = require('../utils/auth');


// TODO: Alex
router.get('/', async (req, res) => {
  try {
    res.render('homePage');
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Tom
// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {

// //TODO: Tom

//     //////// SAMPLE FROM MINI PROJECT ////////
//      // Find the logged in user based on the session ID

//     //  const userData = await User.findByPk(req.session.user_id, {
//     //     attributes: { exclude: ['password'] },
//     //     include: [{ model: Project }],
//     //   });
  
//     //   const user = userData.get({ plain: true });
  
//     //   res.render('profile', {
//     //     ...user,
//     //     logged_in: true
//     //   });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// TODO: Tom
router.get('/login', (req, res) => {
  
//////// SAMPLE FROM MINI PROJECT ////////
// If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');

});

module.exports = router;
