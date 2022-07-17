// TODO
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class medMilestones extends Model {}

medMilestones.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //Name of the medical milestone, i.e. 'Tetnus shot' or '2 week appointment'
    medMilestone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // NEW FIELD - Is this milestone completed yes/no
    medMilestone_complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        //Boolean default value is automatically false, which means milestone isn't completed
      },
    //NEW FIELD - when the procedure/appointment is recommended to occur
    medMilestone_ToDoDate: {
        type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    //NEW FIELD - when the procedure/appointment is scheduled/took place - i.e. April 1, 2022
    medMilestone_dateComplete: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // ?? Do we need to keep this?
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    //Foreign key references Child
    child_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'child',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'medMilestones',
  }
);

module.exports = medMilestones;
