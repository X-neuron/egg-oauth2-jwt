'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'writeByX-neuron???!!!';

  // add your config here
  config.middleware = [];

  // config.sequelize = {
  //   dialect: 'mariabd',
  //   host: 'localhost',
  //   port: 3306,
  //   database: 'egg-sequelize-default',
  //   username: 'root',
  //   password: '',
  // };

  const userConfig = {
    // myAppName: 'egg',
    myAppName: 'xplat',
    myRSABits: 1024,
    // myDbPwd: '$2a$10$yoUl2hbmofMKhHeyV9i7.OBA3nb8xV9W2nL1FfdS.8N0uwdoa75bW',
    // myredisPwd: '$2a$10$4vTQMZh7P3h3W5Kz1lpkkudslTrjfqdkKcwwqpdCuVTAy0AqdimW.',
  };

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mariadb',
    database: 'xplat',
    host: 'localhost',
    port: 3306,
    username: 'root',
    // password: userConfig.myDbPwd,
    password: 'wxz7758520',
  };

  config.parameters = {
    logParameters: true,
    filterParameters: [ 'pwd' ],
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '192.9.200.199' ],
    cors: {
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
  };
  config.redis = {
    client: {
      port: 6379,
      host: '192.168.99.107',
      password: '7758520',
      // password: userConfig.myredisPwd,
      db: 0,
      weakDependent: true,
    },
  };

  config.oAuth2Server = {
    debug: config.env === 'local',
    grants: [ 'password', 'authorization_code', 'refresh_token', 'client_credentials' ],
  };

  return {
    ...config,
    ...userConfig,
  };
};
