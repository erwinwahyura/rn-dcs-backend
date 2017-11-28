'use strict';
module.exports = function(sequelize, DataTypes) {
  var karyawan = sequelize.define('karyawan', {
    nip: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    pangkat: DataTypes.STRING,
    gol: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return karyawan;
};