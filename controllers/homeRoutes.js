const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, devMilestones, medMilestones } = require('../models');

/////SAMPLE FROM MINI PROJECT/////
// const { Project, User } = require('../models');


// TODO: Alex
router.get('/', async (req, res) => {
  try {
    // creating a counter for total # of dev and med TADAs completed by all user's children
    const devcount = await devMilestones.count({
      where: { devMilestone_complete: true },
    });
    console.log(devcount);
    const medcount = await medMilestones.count({
      where: { medMilestone_complete: true },
    });
    console.log(medcount);
    
    res.render('homepage', { 
      // projects, 
      logged_in: req.session.logged_in,
      devcount,
      medcount
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    console.log(req.session);
    console.log(userData);

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/addchild', withAuth, async (req, res) => res.render('addchild'));


router.get('/login', (req, res) => {
  
//////// SAMPLE FROM MINI PROJECT ////////
// If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    console.log(req.session.logged_in);
    console.log('We are logged in and are redirecting')
    console.log(req.session.cookie);
    res.redirect('/profile');
    return;
  }

  res.render('login');

});

router.get('/about', async (req, res) => {
  try {
    res.render('aboutus');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
