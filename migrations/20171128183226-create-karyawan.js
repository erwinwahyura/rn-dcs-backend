'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('karyawans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nip: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      pangkat: {
        type: Sequelize.STRING
      },
      gol: {
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
    return queryInterface.dropTable('karyawans');
  }
};