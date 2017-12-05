'use strict';
module.exports = function(sequelize, DataTypes) {
  var penilaian = sequelize.define('penilaian', {
    id_absen: DataTypes.INTEGER,
    kerapihan: DataTypes.STRING,
    sikap: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return penilaian;
};