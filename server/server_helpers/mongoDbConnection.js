'use strict';
const mongoose = require('mongoose');
const key = require('../../keys.js');
const dbUri = `mongodb://${key.dbUser}:${key.dbPassword}@${key.dbAddress}`;
module.exports = mongoose.connect(dbUri); // exports the database
