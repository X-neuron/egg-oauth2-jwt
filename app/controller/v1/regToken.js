'use strict';
const Controller = require('egg').Controller;
const ecc = require('eosjs-ecc');

class RegTokenController extends Controller {
  async generateToken() {
    const { ctx, app } = this;

    const tokenRule = {
      requestKey: { type: 'string', required: true }, // ecc的 client pubkey ,server using pubkey to encrypt the message
      requestSeed: { type: 'string', required: true }, // ecc.signHash 的hash值
    };

    let priKey = '';
    let pubKey = '';
    console.log(ctx.params);
    // ctx.logger.warn(ctx.request.body);
    // 校验参数
    try {
      ctx.validate(tokenRule, ctx.params);
    } catch (err) {
      // ctx.logger.warn(err.errors);
      // ctx.service.return.ajaxReturn.fail(301, err.errors);
      ctx.status = 301;
      ctx.body = { msg: err.errors };
      return;
    }
    const clientPubKey = ecc.recoverHash(ctx.params.requestKey, ctx.params.requestSeed);
    console.log(clientPubKey);
    if (ecc.verify(ctx.params.requestKey, ctx.params.params.requestSeed, clientPubKey, 'utf-8', true) && ecc.isValidPublic(clientPubKey)) {
      // 以接受的 公钥为key，生成 该次对话相应的 server prikey,pubkey
      let priKey,
        pubKey;
      const pairKeys = await app.redis.hkeys(clientPubKey);
      console.log(pairKeys);
      if (!pairKeys) {
        ecc.randomKey().then(genPriKey => {
          priKey = genPriKey;
          pubKey = ecc.privateToPublic(priKey);
        });
        await app.redis.hset(clientPubKey, 'privKey', priKey, 'pubKey', pubKey);
        await app.redis.expire(clientPubKey, 120);
      } else {
        priKey = pairKeys.priKey;
        pubKey = pairKeys.pubKey;
      }

      const resSeed = ecc.sha256(pubKey);
      ctx.status = 200;
      ctx.body = { resKey: ecc.signHash(resSeed, priKey, 'utf-8'), resSeed };

    } else {
      ctx.status = 301;
      ctx.body = { msg: '请求数据异常，拒绝访问！' };
    }
  }
}

module.exports = RegTokenController;
