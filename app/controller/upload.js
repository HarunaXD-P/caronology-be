'use strict';
const path = require('path');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');
var md5 =require("md5");
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
    let res = await ctx.service.fileDB.AddFileRecord({
      fileId: md5(filename + toString(Date.now())),
      fileName: filename,
      fileLocation: targetPath,
      fileProtagonist: 'Songlian'
    })
    ctx.body = {
      status: 'ok',
      data: res
    }
  }
}

module.exports = UploadController;
