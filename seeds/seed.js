const sequelize = require('../config/connection');
const { User, Been, Planned, Review } = require('../models');

const userData = require('./userData.json');
const beenData = require('./beenData.json');
const plannedData = require('./plannedData.json');
const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHook: true,
    returning: true,
  });

  const been = await Been.bulkCreate(beenData, { returning: true });
  const planned = await Planned.bulkCreate(plannedData, { returning: true });
  const review = await Review.bulkCreate(reviewData, { returning: true });

  process.exit(0);
};

seedDatabase();
