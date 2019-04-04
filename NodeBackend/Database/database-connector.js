const mongoose = require('mongoose');
const config   = require('../config');
mongoose.Promise = global.Promise;

dbUrl =  config["db-connection-string"] + '/' + config["db-name"];
// Export connection
dbConnector = function(mongoUri) {
    return mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected ' + dbUrl);
    }, (err) => {
        console.warn(err.toString())
    })
    .catch((err) => {
        console.warn('Warning', err.toString());
        throw error;
    });
}(dbUrl);

module.exports = dbConnector;