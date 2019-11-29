'use strict';

const Controller = require('egg').Controller;

const ecc = require('eosjs-ecc');

class UserRegisterController extends Controller {
  async create() {
    const { ctx, app } = this;
    const regMesRule = {
      account: { type: 'string', required: true },
      epwd: { type: 'string', required: true },
      email: { type: 'string', required: true },
      tel: { type: 'string', required: true },
    };

    // ctx.logger.warn(ctx.request.body);
    // 校验参数
    try {
      ctx.validate(regMesRule, ctx.params.params);
    } catch (err) {
      // ctx.logger.warn(err.errors);
      // ctx.service.return.ajaxReturn.fail(301, err.errors);
      ctx.status = 301;
      ctx.body = { msg: err.errors };
      return;
    }


    if (ecc.isValidPublic(ctx.params.params.pkKey)) {
      const t = 1;

    } else {
      ctx.status = 301;
      ctx.body = { msg: '非法请求，拒绝访问！' };
    }


    ctx.status = 200;
    ctx.body = { msg: '注册成功！' };
    // ctx.service.return.ajaxReturn.success(200, {});
  }


}

module.exports = UserRegisterController;
