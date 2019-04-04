var mosca       = require('mosca');
require('./database-connector/database-connector');

var config = require('./config');

var server = new mosca.Server(config);

server.authenticate = require('./auth/authcontroller').auth;

server.on('error', (err) => {
    console.warn(err);
});

server.on('ready', function(){
    console.log('Mosca server is up and running');
});

server.on('clientConnected', function(client) {
    console.log('New connection: ', client.id );
});

server.on('published', function (packet, client) {
    console.log("Published :=", packet.payload.toString());
});

server.on('subscribed', function (topic, client) {
    console.log("Subscribed :=", client.packet);
});