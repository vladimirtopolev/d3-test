const async = require('async');
const CatalogCharacteristic = require('../models/drawcharacteristics/catalogCharacteristic');
const { dropTables } = require('../utilities/db');


module.exports = (endCallback) => {
    return new Promise((resolve, reject) => {
        async.series([
            cb => dropTables([CatalogCharacteristic], cb),
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
