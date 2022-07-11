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
    // medMilestone_complete: {
    //     //TODO Boolean
    // },
    //NEW FIELD - when the procedure/appointment is recommended to occur
    medMilestone_ToDoDate: {
        type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    //NEW FIELD - when the procedure/appointment is scheduled/took place
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
    underscored: true,
    modelName: 'medMilestones',
  }
);

module.exports = medMilestones;
