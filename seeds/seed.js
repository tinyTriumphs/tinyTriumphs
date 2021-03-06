//NOTE UserData seeds will need password once validation is ready

//TODO: seed birthdate with actual date
//TODO: seed data for dev and med milestones

const sequelize = require('../config/connection');
const { User, Child, medMilestones, devMilestones } = require('../models');

const userData = require('./userData.json');
const childData = require('./childData.json');
const devMilestonesData = require('./devMilestonesData.json');
const medMilestonesData = require('./medMilestonesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData);
  const children = await Child.bulkCreate(childData);
  const medical = await medMilestones.bulkCreate(medMilestonesData);
  const development = await devMilestones.bulkCreate(devMilestonesData);



  process.exit(0);
};

seedDatabase();
