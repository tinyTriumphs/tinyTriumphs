const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Child extends Model {}

Child.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // NEW FIELD
    birthdate: {
      // DATEONLY = string representing the date in the ISO format of YYYY-MM-DD.
      type: DataTypes.DATEONLY,
      allowNull: false,
      // defaultValue: DataTypes.NOW,
    },
    gender: {
      // type: DataTypes.ENUM,
      // allowNull: false,
      //value: ['male', 'female', 'other'],
      type: DataTypes.STRING,
      validate: {
        isIn: [[
         'female',
         'male',
         'other'
        ]],
       }
    },
    //Do we need to keep this?
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        allowNull: false,
      },
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'child',
  }
);




module.exports = Child;
