const async = require('async');

const User = require('../models/user');
const Property = require('../models/properties/property');

const Table = require('../models/moduleTable/table');
const TableColumn = require('../models/moduleTable/tableColum');
const TableRow = require('../models/moduleTable/tableRow');
const TableCell = require('../models/moduleTable/tableCell');

const { dropTables } = require('../utilities/db');


module.exports = (endCallback) => {
    return new Promise((resolve, reject) => {
        async.series([
            cb => dropTables([User, Property, Table, TableColumn, TableRow, TableCell], cb),
        ], (err, res) => {
            if (endCallback) {
                endCallback(err, res);
            }

            if (err) {
                reject(err);
            } else {
                console.log('Script applied succesfully');
                resolve(res);
            }
        })
    });

};
