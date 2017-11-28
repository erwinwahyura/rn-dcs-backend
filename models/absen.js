'use strict';
module.exports = function(sequelize, DataTypes) {
  var absen = sequelize.define('absen', {
    tgl: DataTypes.STRING,
    kehadiran: DataTypes.STRING,
    kerapian: DataTypes.STRING,
    sikap: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return absen;
};