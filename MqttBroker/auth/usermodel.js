var mongoose = require('mongoose');

exports.userModel = mongoose.model('User',new mongoose.Schema({
    objectId: mongoose.Schema.ObjectId,
    name: String,
    password: String,
    isAdmin: Boolean
}));