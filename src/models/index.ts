import Sequelize from 'sequelize'
import app from '../../src/app'

const models = app.get('models');
const sequelize = app.get('sequelize');

// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
module.exports = Object.assign({
  Sequelize,
  sequelize
}, models);
