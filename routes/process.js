var express = require('express');
var router = express.Router();
var c_auth = require('../controllers/c_auth')
var c_proses = require('../controllers/c_proses')
var c_bulk = require('../controllers/c_bulk')
/* GET users listing. */

router.post('/', c_proses.getDataByWeek);
router.post('/tunggal', c_proses.getDataByWeekAndIdUser);
router.post('/fuzzy', c_proses.fuzzyNR);
router.post('/fuzzytunggal', c_proses.fuzzyTunggal);
router.post('/save', c_bulk._bulkInsert)

module.exports = router;
