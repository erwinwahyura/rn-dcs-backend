var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_penilaian = require('../controllers/c_penilaian')

/* GET users listing. */

router.post('/', c_penilaian._create)
router.get('/', c_penilaian._readAll)
router.get('/:id', c_penilaian._readOne)
router.put('/:id', c_penilaian._update)
router.delete('/:id', c_penilaian._delete)

module.exports = router;
