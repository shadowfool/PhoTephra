const db = require('../config.js');
const User = require('../models/user.js');

const Users = new db.Collection();

Users.model = User;

module.exports = Users;
