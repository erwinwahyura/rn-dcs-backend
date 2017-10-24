var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', c_auth.signUp)
router.post('/signin', c_auth.signIn)

module.exports = router;
