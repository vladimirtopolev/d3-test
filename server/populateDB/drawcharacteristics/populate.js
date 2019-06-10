const async = require('async');
const { dropTables, saveItem, saveItems } = require('../../utilities/db');
const CatalogCharacteristic = require('../../models/drawcharacteristics/catalogCharacteristic');
const CATALOG_CHARACTERISTICS = require('./constants');

module.exports = (endCallback) => {
    async.series([
        cb => dropTables([CatalogCharacteristic], cb),
        cb => saveItems(CatalogCharacteristic, CATALOG_CHARACTERISTICS, cb),
    ], (err, res) => {
        endCallback(err);
    });
};
