'use strict';
// const Controller = require('egg').Controller;
const Controller = require('../../core/base_controller');
const ecc = require('eosjs-ecc');
const idgenerate = require('nanoid/generate');
const nacl = require('tweetnacl-ts');
// const stringify = require('json-stable-stringify');

function stringToUint8Array(str) {
  const arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  const tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
}

class RegTokenController extends Controller {
  async generateToken() {
    const { ctx, app } = this;
    const tokenRule = {
      requestKey: { type: 'string', required: true }, // ecc的 client pubkey ,server using pubkey to encrypt the message
      requestSeed: { type: 'string', required: true }, // ecc.signHash 的hash值
    };

    // 校验参数
    const tmpId = idgenerate('123456789', 11);
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

    const clientPubKey = nacl.sign_open(nacl.decodeBase64(ctx.params.requestKey), nacl.decodeBase64(ctx.params.requestSeed));

    if (clientPubKey) {
      // 以接受的 公钥为key，生成 该次对话相应的 server prikey,pubkey
      let priKey,
        pubKey;

      const signBoxKeyPair = nacl.sign_keyPair(); // just for exchange ,so generate per requiest
      const pairKeys = await app.redis.hvals(tmpId);
      if (pairKeys.length === 0) {
        const boxKeyPair = nacl.box_keyPair();

        priKey = boxKeyPair.secretKey;
        pubKey = boxKeyPair.publicKey;

        await app.redis.hmset(tmpId, 'clientPubKey', nacl.encodeBase64(clientPubKey), 'priKey', nacl.encodeBase64(priKey), 'pubKey', nacl.encodeBase64(pubKey));
        await app.redis.expire(tmpId, 120);
      } else {
        priKey = nacl.decodeBase64(pairKeys[1]); // redis存储base64格式的key
        pubKey = nacl.decodeBase64(pairKeys[2]); // redis存储base64格式的key
      }
      const nonce = nacl.randomBytes(24);
      console.log(clientPubKey);
      console.log(nonce);
      this.success({
        resKey: nacl.encodeBase64(nacl.sign(pubKey, signBoxKeyPair.secretKey)),
        xn_ss: nacl.encodeBase64(nacl.box(stringToUint8Array(tmpId), nonce, clientPubKey, priKey)),
        resSeed: nacl.encodeBase64(signBoxKeyPair.publicKey),
        nonce: nacl.encodeBase64(nonce),
      });

    } else {
      this.illegalAccess('请求数据异常，拒绝访问！');
    }
  }
}

module.exports = RegTokenController;
