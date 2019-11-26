'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    async getClient(clientId, clientSecret) {
      try {
        console.log('getClient invoked.......');
        const client = await this.ctx.model.Client.getClient(clientId, clientSecret);
        if (!client) return false;
        return {
          id: client.clientId,
          redirectUris: client.redirectUri.split(','),
          grants: client.grants.split(','),
        };
      } catch (err) {
        return false;
      }
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
