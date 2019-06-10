const async = require('async');


const populateDrawcharacteristics = require('./drawcharacteristics/populate');

module.exports = (endCallback) => {
    return new Promise((resolve, reject) => {
        async.series([
            cb => populateDrawcharacteristics(cb),
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
