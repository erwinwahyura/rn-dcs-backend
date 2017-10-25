var express = require('express');
var router = express.Router();
const c_karyawan = require('../controllers/c_karyawan')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/karyawan', c_karyawan.create);
router.get('/karyawan', c_karyawan.getAllKaryawan);
router.delete('/karyawan/:id', c_karyawan.deleteKaryawan);

module.exports = router;
