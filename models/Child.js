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
      },
    },
    medical_id: {
      type: DataTypes.INTEGER,
      referneces: {
        model: 'medical',
        key: 'id'
      }
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
