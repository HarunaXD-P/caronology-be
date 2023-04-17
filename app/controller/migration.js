'use strict';

const { Controller } = require('egg');

class MigrationController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi. this is the test of migration';
  }
}

module.exports = MigrationController;
