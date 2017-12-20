'use strict';
module.exports = function(sequelize, DataTypes) {
  var penilaian = sequelize.define('penilaian', {
    id_absen: DataTypes.INTEGER,
    kehadiran: DataTypes.INTEGER,
    kerapihan: DataTypes.INTEGER,
    sikap: DataTypes.INTEGER,
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return penilaian;
};