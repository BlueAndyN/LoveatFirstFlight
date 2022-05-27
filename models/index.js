const User = require('./User');
const Been = require('./Been');
const Planned = require('./Planned');
const Review = require('./Review');

User.hasMany(Been, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Planned, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Been.belongsTo(User, {
  foreignKey: 'user_id',
});

Been.hasMany(Review, {
  foreignKey: 'been_id',
});

Planned.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Been, Planned, Review };
