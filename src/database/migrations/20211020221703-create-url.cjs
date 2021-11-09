'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('urls', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      original_url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'URL Original'
      },
      shortened: {
        type: Sequelize.STRING(6),
        allowNull: false,
        unique: true,
        comment: 'String referente a URL encurtada'
      },
      access: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Quantidade de vezes que uma URL foi acessada'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('urls');
  }
};
