import Sequelize from 'sequelize';

import dbConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connect = new Sequelize(dbConfig);

    models.map((model) => model.init(this.connect));
  }
}

export default new Database();
