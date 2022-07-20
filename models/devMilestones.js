//TODO

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class devMilestones extends Model {}

devMilestones.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        //Name of the developmental milestone - i.e. 'First tooth' or 'Learned to walk'
        devMilestone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // NEW FIELD - Is this milestone completed yes/no
        devMilestone_complete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          //Boolean default value is automatically false, which means milestone isn't completed
        },
        //NEW FIELD - when the developmental milestone might happen - i.e. Jan 3, 2023
        //note: this shouldn't be rendered, but could be used to help SORT data; should be at the early end of the CDC range (aka if 3-6 mon, render at 3 mon date from birth)
        devMilestone_expectedDate: {
            type: DataTypes.STRING,
          allowNull: false,
        },
        //NEW FIELD - the RANGE of the milestone expected to occur - i.e. 3-6 months
        devMilestone_expectedRange: {
            type: DataTypes.STRING,
          allowNull: false,
        },

        //NEW FIELD - when the dev milestone took place
        devMilestone_dateComplete: {
            type: DataTypes.STRING,
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
        modelName: 'devMilestones',
      }
    );
    
    module.exports = devMilestones;
