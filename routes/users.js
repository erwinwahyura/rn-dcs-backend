var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_user = require('../controllers/c_user')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// didnt use any this
router.post('/signup', c_user._create)
router.post('/signin', c_user._signin)

router.get('/', c_user._read)
router.put('/:id', c_auth.authUser, c_user._update)
router.delete('/:id', c_auth.authUser, c_user._delete)

module.exports = router;
