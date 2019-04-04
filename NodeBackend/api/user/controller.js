var User = require('./model').model;

exports.setup = function ( req, res ) {
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });

    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
};

exports.getAll = function ( req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
};

exports.empty = function (req, res) {
    res.send('respond with a resource');
};