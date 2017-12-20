'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('penilaians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_absen: {
        type: Sequelize.INTEGER
      },
      kehadiran: {
        type: Sequelize.INTEGER
      },
      kerapihan: {
        type: Sequelize.INTEGER
      },
      sikap: {
        type: Sequelize.INTEGER
      },
      tag: {
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
    return queryInterface.dropTable('penilaians');
  }
};