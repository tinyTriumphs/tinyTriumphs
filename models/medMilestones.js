// TODO
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class medMilestones extends Model {}

//Medical Milestone Model
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
    // Is this milestone completed - yes/no
    medMilestone_complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        //Boolean default value is automatically false, which means milestone isn't completed
      },
    //When the procedure/appointment is recommended to occur
    medMilestone_ToDoDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //The RANGE of the milestone expected to occur - i.e. 3-6 months
    medMilestone_expectedRange: {
      type: DataTypes.STRING,
    allowNull: true,
    },
    //When the procedure/appointment is scheduled/took place - i.e. April 1, 2022
    medMilestone_dateComplete: {
        type: DataTypes.STRING,
        allowNull: true
    },
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
