'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const app = app.model.define('app', {
    openId: STRING(40),
    name:STRING(30),
    public_secret: STRING(40),
    private_secret: STRING(40),
    encryption_type:STRING(20),
    last_sign_in_at: DATE,
    last_sign_out_at: DATE,
    create_at: DATE,
    update_at: DATE,
  });
};
