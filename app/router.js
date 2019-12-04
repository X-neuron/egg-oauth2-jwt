'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const apiVersion = 'v1';

  // Account register
  // router.get(`/api/${apiVersion}/regToken `, controller[apiVersion].regToken.generateToken);
  router.get('/api/v1/regToken', controller.v1.regToken.generateToken);
  router.resources('users', '/api/v1/users', controller.v1.users);
  // router.resources('userRegister', `/api/${apiVersion}/userRegister `, controller[apiVersion].users);

  // OAuth controller
  // router.resources('users', `/api/${apiVersion}/users`, controller.v1.users);

  // router.get('users.authorize', `/api/${apiVersion}/authorize`, controller[apiVersion].users.authorize);
  // router.resources('users.token', `/api/${apiVersion}/users/token`, controller[apiVersion].users.token);
  // router.resources('users.authorize', `/api/${apiVersion}/users/authorize`, controller[apiVersion].users.authorize);
  // router.resources('user.authenticate', `/api/${apiVersion}/users/authenticate`, controller[apiVersion].users.authenticate);

};

