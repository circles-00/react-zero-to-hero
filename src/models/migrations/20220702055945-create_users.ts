import { DataTypes, QueryInterface } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },


      auth0Id: { type: DataTypes.STRING },

      googleId: { type: DataTypes.STRING },

      facebookId: { type: DataTypes.STRING },

      twitterId: { type: DataTypes.STRING },

      githubId: { type: DataTypes.STRING },

      createdAt: {
        type: DataTypes.TIME
      },

      updatedAt: {
        type: DataTypes.TIME
      }

    }, {});
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable('users');
  },
};

