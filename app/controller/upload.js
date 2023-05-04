'use strict';
const path = require('path');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');
const { Controller } = require('egg');

class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    const file =  ctx.request.files[0];
    // 获取文件名称
    const filename = file.filename;
    const targetPath = path.join('app/public/upload',filename);
    // 读取文件
    const source = fs.createReadStream(file.filepath);
    // 创建写入流
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source,target);
    } finally {
      await ctx.cleanupRequestFiles();
    }
    ctx.body = {
      status: 'ok',
      data:{}
    }
  }
}

module.exports = UploadController;
