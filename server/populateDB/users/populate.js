const async = require('async');
const { dropTables, saveItem, saveItems } = require('../../utilities/db');
const User = require('../../models/user');
const USERS = require('../users/constants');

module.exports = (endCallback) => {
    async.series([
        cb => dropTables([User], cb),
        cb => saveItems(User, USERS, cb),
    ], (err, res) => {
        endCallback(err);
    });
}