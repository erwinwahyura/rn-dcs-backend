'use strict';
module.exports = function(sequelize, DataTypes) {
  var karyawan = sequelize.define('karyawan', {
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return karyawan;
};