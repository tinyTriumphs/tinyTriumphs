const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Child extends Model {}

//Child model
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
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    profileImage: {
      type: DataTypes.STRING,
      //Sets a default image when a child is created
      defaultValue: "https://tinytriumphs-upload.s3.amazonaws.com/uploads/781a208f-5d65-4fe0-b4d5-bed125b185da-placeholderbabyimage.jpg"
    },
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
