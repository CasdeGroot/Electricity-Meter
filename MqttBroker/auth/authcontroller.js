var userModel = require('./usermodel').userModel;
var bcrypt = require('bcrypt');
exports.auth = function (client, username, password, callback) {

    if(username && password) {
        userModel.findOne({
            username: username
        }, (err, user) => {
            if(err) throw err;

            if(!user)
                callback(null, false);

            if(user) {
                bcrypt.compare(password.toString(), user.password, (err, isMatch) => {

                    if(err) callback(null, false);
                    if(!isMatch) callback(null, false);
                    callback(null, true);
                });
            }
        }).catch((err) => {
            if(err) throw err;
        });
    }
};