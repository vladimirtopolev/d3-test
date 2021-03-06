import mongoose from 'mongoose';
import config from 'config';

const dbConfig = config.get('dbConfig');

function open() {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbConfig.host, { dbName: dbConfig.dbName }, (err, res) => {
            if (err) return reject(err);

            console.log(`Connection to DB is successful: ${dbConfig.host}`);
            resolve();

        })
    })
}

module.exports = { open };
