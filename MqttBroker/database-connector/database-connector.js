var mongoose = require('mongoose');
var environment = require('../environment');
exports.databaseconnector = mongoose.connect(environment.dbUrl + '/' + environment.db).then(() => {
    console.log('Mongo connected');
}, (err) => {
    console.warn(err.toString());
});