var express = require('express');
var router = express.Router();
// const c_karyawan = require('../controllers/c_karyawan')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
