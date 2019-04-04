var express = require('express');
var User    = require('../api/user/controller');
var router = express.Router();

router.get('/', User.getAll);
router.get('/setup', User.setup);
module.exports = router;
