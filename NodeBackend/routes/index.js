var express = require('express');
var router = express.Router();
var auth = require('../api/auth/controller');

/* GET home page. */
router.get('/api/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(auth.verify);

module.exports = router;
