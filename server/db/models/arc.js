const db = require('../config.js');
require('./user');
require('./image');

const Arc = db.Model.extend({
  tableName: 'arcs',
  hasTimestamps: true,

  user() {
    return this.belongsTo('User', 'user_id');
  },

  images() {
    return this.hasMany('Image', 'arc_id');
  },
});

module.exports = db.model('Arc', Arc);
