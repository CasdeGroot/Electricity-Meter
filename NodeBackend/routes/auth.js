var express = require('express');
var router = express.Router();
var auth = require('../api/auth/controller');

router.post('/', auth.authenticate);

module.exports = router;