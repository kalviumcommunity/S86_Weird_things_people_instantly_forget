const User = require('./sqlUser');
const Entity = require('./sqlEntity');

// Define relationships
Entity.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Entity, { foreignKey: 'created_by' });

module.exports = { User, Entity };