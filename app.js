'use strict';
// const bcrypt = require('bcryptjs');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
    // generate you db password using bcrypt here
    // const saltRounds = 10;

    // const pwd = 'wxz7758520';
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   bcrypt.hash(pwd, salt, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    //   });
    // });

    // const pwd2 = '7758520';
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   bcrypt.hash(pwd2, salt, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    //   });
    // });


    // decode at here
    // this.app.config.sequelize =
    // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
    // const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    // this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');

  }
}

module.exports = AppBootHook;
