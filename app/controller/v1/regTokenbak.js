'use strict';
// const Controller = require('egg').Controller;
const Controller = require('../../core/base_controller');
const ecc = require('eosjs-ecc');
const idgenerate = require('nanoid/generate');
// const stringify = require('json-stable-stringify');
class RegTokenController extends Controller {
  async generateToken() {
    const { ctx, app } = this;
    const tokenRule = {
      requestKey: { type: 'string', required: true }, // ecc的 client pubkey ,server using pubkey to encrypt the message
      requestSeed: { type: 'string', required: true }, // ecc.signHash 的hash值
    };

    // 校验参数
    const tmpId = idgenerate('123456789', 10);
    console.log(tmpId);
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
    if (ecc.isValidPublic(clientPubKey)) {
      // 以接受的 公钥为key，生成 该次对话相应的 server prikey,pubkey
      let priKey,
        pubKey;
      const pairKeys = await app.redis.hvals(tmpId);
      if (pairKeys.length === 0) {
        priKey = await ecc.randomKey();
        pubKey = ecc.privateToPublic(priKey);
        await app.redis.hmset(tmpId, 'clientPubKey', clientPubKey, 'priKey', priKey, 'pubKey', pubKey);
        await app.redis.expire(tmpId, 120);
      } else {
        priKey = pairKeys[1];
        pubKey = pairKeys[2];
      }
      console.log(pubKey);
      const resSeed = ecc.sha256(pubKey);
      this.success({ resKey: ecc.signHash(resSeed, priKey), tmpId: JSON.stringify(ecc.Aes.encrypt(priKey, clientPubKey, tmpId)), resSeed });

    } else {
      this.illegalAccess('请求数据异常，拒绝访问！');
    }
  }
}

module.exports = RegTokenController;
