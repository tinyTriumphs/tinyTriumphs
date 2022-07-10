const router = require('express').Router();
const userRoutes = require('./userRoutes');
const toDoRoutes = require('./toDoRoutes');
const taDaRoutes = require('./taDaRoutes');

//All user session data
router.use('/todos', toDoRoutes);

//All UPCOMING milestones and appointments
router.use('/todos', toDoRoutes);

//All COMPLETED milestones and appointments
router.use('/tadas', taDaRoutes);

module.exports = router;
