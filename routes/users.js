var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_user = require('../controllers/c_user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', c_auth.signUp)
router.post('/signin', c_auth.signIn)

router.get('/user', c_user.getAllUser)

module.exports = router;
