const sequelize = require('../config/connection');
const { User, Been, Planned, Review } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHook: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
