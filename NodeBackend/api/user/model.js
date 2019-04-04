var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

exports.model = mongoose.model('User', new Schema({
    objectId: objectId,
    name: String,
    password: String,
    admin: Boolean
}));