const User = require('./User');
const Child = require('./Child');
const devMilestones = require('./devMilestones');
const medMilestones = require('./medMilestones');

User.hasMany(Child, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Child.belongsTo(User, {
    foreignKey: 'user_id'
});

Child.hasMany(devMilestones, {
    foreignKey: 'child_id',
    onDelete: 'CASCADE'
});

devMilestones.belongsTo(Child, {
    foreignKey: 'child_id'
});

Child.hasMany(medMilestones, {
    foreignKey: 'child_id',
    onDelete: 'CASCADE'
})

medMilestones.belongsTo(Child, {
    foreignKey: 'child_id'
})

module.exports = { User, Child, devMilestones, medMilestones };