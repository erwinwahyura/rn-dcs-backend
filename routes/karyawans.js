var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_karyawan = require('../controllers/c_karyawan')

/* GET users listing. */

router.post('/', c_auth.authUser, c_karyawan._create)
router.get('/', c_karyawan._read)
router.put('/:id', c_auth.authUser, c_karyawan._update)
router.delete('/:id', c_auth.authUser, c_karyawan._delete)

module.exports = router;
