const mongoose = require('mongoose');
const dbConfig = require('../../migrate-mongo-config').mongodb;


function getMongooseConnection() {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbConfig.url, { useNewUrlParser: true, dbName: dbConfig.databaseName }, (err, res) => {
            if (err) return reject(err);
            resolve(dbConfig);
        })
    })
}

module.exports = getMongooseConnection;
