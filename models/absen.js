'use strict';
module.exports = function(sequelize, DataTypes) {
  var absen = sequelize.define('absen', {
    id_karyawan: DataTypes.INTEGER,
    tgl: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return absen; 
};