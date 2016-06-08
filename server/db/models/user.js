const db = require('../config.js');
require('./arc');

const User = db.Model.extend({
  tableName: 'users',

  arcs() {
    return this.hasMany('Arc', 'user_id');
  },
});

module.exports = db.model('User', User);
