'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const user = app.model.define('user', {
    openId: INTEGER(11),
    login: STRING,
    account: STRING(30),
    password: STRING(32),
    email: STRING(40),
    tel: INTEGER(11),
    last_sign_in_at: DATE,
    create_at: DATE,
    update_at: DATE,
  });
};
