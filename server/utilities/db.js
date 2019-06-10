const async = require('async');

function saveItem(SchemaConstructor, item, cb) {
    const newItem = new SchemaConstructor(item);
    newItem.save((err, savedItem) => cb(err, savedItem));
}

function saveItems(SchemaConstructor, items, endCallback) {
    async.map(
        items,
        (item, cb) => saveItem(SchemaConstructor, item, cb),
        (err, results) => endCallback(err, results)
    )
}

function dropTable(SchemaConstructor, endCallback) {
    SchemaConstructor.deleteMany({}, (err) => endCallback(err));
}

function dropTables(SchemaConstructors, endCallback) {
    async.each(
        SchemaConstructors,
        (SchemaConstructor, cb) => dropTable(SchemaConstructor, cb),
        (err) => {
            endCallback(err);
        }
    )
}

module.exports = {
    saveItem,
    saveItems,
    dropTable,
    dropTables
}