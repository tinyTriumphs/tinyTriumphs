//NOTE UserData seeds will need password once validation is ready

//TODO: seed birthdate with actual date
//TODO: seed data for dev and med milestones

const sequelize = require('../config/connection');
const { User, Child, medMilestones, devMilestones } = require('../models');

const userData = require('./userData.json');
const childData = require('./childData.json');
// const devMilestonesData = require('./devMilestonesData.json');
// const medMilestonesData = require('./medMilestonesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData);
  const children = await Child.bulkCreate(childData);


///// SAMPLE FROM MINI PROJECT///
// // removed second paramater from userData - {
//     individualHooks: true,
//     returning: true,
//   }
//   for (const project of projectData) {
//     await Project.create({
//       ...project,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

  process.exit(0);
};

seedDatabase();
