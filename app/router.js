'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // OAuth controller
  const apiVersion = 'v1';
  router.resources('users', `/api/${apiVersion}/users`, controller.v1.users);

  router.get('users.authorize', `/api/${apiVersion}/authorize`, controller[apiVersion].users.authorize);
  router.resources('users.token', `/api/${apiVersion}/users/token`, controller[apiVersion].users.token);
  router.resources('users.authorize', `/api/${apiVersion}/users/authorize`, controller[apiVersion].users.authorize);
  router.resources('user.authenticate', `/api/${apiVersion}/users/authenticate`, controller[apiVersion].users.authenticate);
};

