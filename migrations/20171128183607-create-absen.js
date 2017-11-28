'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('absens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_peniliain: {
        type: Sequelize.INTEGER
      },
      tgl: {
        type: Sequelize.STRING
      },
      absensi: {
        type: Sequelize.STRING
      },
      kerapian: {
        type: Sequelize.STRING
      },
      sikap: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('absens');
  }
};