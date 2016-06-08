const db = require('../config.js');
const Image = require('../models/image.js');

const Images = new db.Collection();

Images.model = Image;

module.exports = Images;
