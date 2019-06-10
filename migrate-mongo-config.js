const config = require('config');
const dbConfig = config.get('dbConfig');

console.log(dbConfig)
module.exports = {
    mongodb: {
        url: dbConfig.host,
        databaseName: dbConfig.dbName,
        options: {
            useNewUrlParser: true
        }
    },
    changelogCollectionName: "changelog"
};
