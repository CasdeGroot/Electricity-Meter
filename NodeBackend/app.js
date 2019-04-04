var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var jwttoken        = require('jsonwebtoken');
var dbConnector     = require('./Database/database-connector');
var config          = require('./config');

var app = express();

var index   = require('./routes/index');
var user    = require('./routes/user');
var auth    = require('./routes/auth');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', config.secret);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/authenticate', auth);
app.use('/api/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var port = 1234;
var server = app.listen(port, function () {
    console.log('Listening server on port ' + server.address().port);
});

