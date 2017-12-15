var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_absen = require('../controllers/c_absen')

/* GET users listing. */

router.post('/', c_absen._create)
router.get('/', c_absen._read)
router.put('/:id', c_absen._update)
router.delete('/:id', c_absen._delete)

module.exports = router;
