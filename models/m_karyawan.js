var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var karyawanSchema = new Schema({
  nip:  {
    type : String,
    required : [true, 'nip is required! please fill it!']
  },
  nama: {
    type : String,
    required : [true, 'nama is required! please fill it!']
  },
  alamat: {
    type : String,
    required : [true, 'nama is required! please fill it!']
  },
  tempat_lahir : String,
  tanggal_lahir : Date,
  jenis_kelamin : String,
  agama : String

});

var karyawan = mongoose.model('Pegawai', karyawanSchema);

module.exports = karyawan