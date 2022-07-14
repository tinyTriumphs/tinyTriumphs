const router = require('express').Router();
const userRoutes = require('./userRoutes');
const childRoutes = require('./childRoutes');
const toDoRoutes = require('./toDoRoutes');
const taDaRoutes = require('./taDaRoutes');

//All user session data
router.use('/users', userRoutes);

//Render all children
router.use('/children', childRoutes);

//All UPCOMING milestones and appointments
router.use('/todos', toDoRoutes);

//All COMPLETED milestones and appointments
router.use('/tadas', taDaRoutes);

module.exports = router;
