// app/core/base_controller.js
'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.status = 200;
    this.ctx.body = {
      success: true,
      resData: data,
    };
  }

  notFound(msg) {
    this.status = 404;
    msg = msg || '未找到资源';
    this.ctx.throw(404, msg);
  }

  illegalAccess(msg) {
    this.status = 301;
    msg = msg || '非法访问';
    this.ctx.throw(301, msg);
  }
}
module.exports = BaseController;
