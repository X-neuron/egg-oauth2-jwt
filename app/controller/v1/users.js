'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async create() {
    const { ctx, app } = this;
    const regMesRule = {
      account: { type: 'string' },
      pwd: { type: 'string' },
      birthday: { type: 'string' },
      education: { type: 'string' },
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
    await app.redis.set('account', 'ture');
    ctx.status = 200;
    ctx.body = { msg: '注册成功！' };
    // ctx.service.return.ajaxReturn.success(200, {});
  }
}

module.exports = UsersController;
