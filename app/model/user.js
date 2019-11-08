'use strict';

module.exports = app => {
  const { STRING, INTERGER, DATE } = app.Sequelize;

  const user = app.model.define('user', {
    guid: STRING(40),
    login: STRING,
    name: STRING(30),
    password: STRING(32),
    last_sign_in_at: DATE,
    create_at: DATE,
    update_at: DATE,
  });


};
