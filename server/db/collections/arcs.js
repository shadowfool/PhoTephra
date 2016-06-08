const db = require('../config.js');
const Arc = require('../models/arc.js');

const Arcs = new db.Collection();

Arcs.model = Arc;

module.exports = Arcs;
