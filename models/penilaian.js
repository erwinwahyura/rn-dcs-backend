'use strict';
module.exports = function(sequelize, DataTypes) {
  var penilaian = sequelize.define('penilaian', {
    id_absen: DataTypes.INTEGER,
    id_karyawan: DataTypes.INTEGER,
    nilai: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return penilaian;
};