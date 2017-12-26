var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_proses = require('../controllers/c_proses')

/* GET users listing. */

router.post('/', c_proses.getDataByWeek);
router.post('/fuzzy', c_proses.fuzzyNR);

module.exports = router;
