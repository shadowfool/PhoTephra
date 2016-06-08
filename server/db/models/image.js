const db = require('../config.js');
require('./arc');

const Image = db.Model.extend({
  tableName: 'images',

  arc() {
    return this.belongsTo('Arc', 'arc_id');
  },
});

module.exports = db.model('Image', Image);
