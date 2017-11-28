'use strict';
module.exports = function(sequelize, DataTypes) {
  var absen = sequelize.define('absen', {
    id_peniliain: DataTypes.INTEGER,
    tgl: DataTypes.STRING,
    absensi: DataTypes.STRING,
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