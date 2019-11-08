'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    async getClient(clientId, clientSecret) {

    }

    async getUser(username, password) {

    }

    async getAccessToken(bearerToken) {

    }

    async saveToken(token, client, user) {

    }

    async revokeToken(token) {

    }

    async getAuthorizationCode(authorizationCode) {

    }

    async saveAuthorizationCode(code, client, user) {

    }

    async revokeAuthorizationCode(code) {

    }

    async getRefreshToken(refreshToken) {


    }
  }

  return Model;
};
