'use strict';
module.exports = function(sequelize, DataTypes) {
  var nilai = sequelize.define('nilai', {
    id_absen: DataTypes.INTEGER,
    nilai: DataTypes.STRING,
    tag: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return nilai;
};