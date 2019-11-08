'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // OAuth controller
  const apiVersion = 1;
  router.resources('users', `/api/v${apiVersion}/users`, controller.v1.users);

  router.get('users.authorize', `/api/v${apiVersion}/authorize`, controller.users.authorize);
  router.resources('users.authorizeToken', `/api/v${apiVersion}/users/authorizeToken`, controller.users.authorizeToken);
  router.resources('users.authorizeToken', `/api/v${apiVersion}/users/authorize`, controller.users.authorizeToken);

};

