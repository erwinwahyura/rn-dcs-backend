var express = require('express');
var router = express.Router();
var nilai = require('../controllers/c_nilai')

router.get('/', nilai._allGetNilai);
router.post('/nama/', nilai._getNilaiByName);
router.post('/week/', nilai._getNilaiByWeek);

module.exports = router;