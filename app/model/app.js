'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const app = app.model.define('app', {
    guid: STRING(40),
    login: STRING,
    name: STRING(30),
    public_secret: STRING(40),
    private_secret: STRING(40),
    encryption_type:STRING(20),
    last_sign_in_at: DATE,
    create_at: DATE,
    update_at: DATE,
  });

};
