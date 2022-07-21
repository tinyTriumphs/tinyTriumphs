const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, devMilestones, medMilestones } = require('../models');

router.get('/', async (req, res) => {
  try {
    // creating a counter for total # of dev and med TADAs completed by all user's children
    const devcount = await devMilestones.count({
      where: { devMilestone_complete: true },
    });

    const medcount = await medMilestones.count({
      where: { medMilestone_complete: true },
    });

    
    res.render('homepage', { 
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
  
// If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');

});

router.get('/about', async (req, res) => {
  try {
    res.render('aboutus', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
