const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Planned model
class Planned extends Model {}

// create fields/columns for Planned model
Planned.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    state_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'planned',
  }
);

module.exports = Planned;
