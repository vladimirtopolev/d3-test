const async = require('async');


const populateUsers = require('./users/populate');

module.exports = (endCallback) => {
    return new Promise((resolve, reject) => {
        async.series([
            cb => populateUsers(cb),
        ], (err, res) => {
            if (endCallback) {
                endCallback(err, res);
                resolve();
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
