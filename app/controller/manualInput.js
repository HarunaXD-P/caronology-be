'use strict';
const path = require('path');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');
var md5 =require("md5");
const { Controller } = require('egg');

class ManualIputController extends Controller {
  async upload_file() {
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
  async get_file_list() {
    const { ctx } = this;
    ctx.body = {
      status: 'ok',
      data: res
    }
  }
  async get_year_list() {

  }
  async get_event_list() {
  }
  async get_proof_list() {

  }
  async get_relation_list() {

  }
  //创建新条目和修改旧条目都用这个
  async save_year() {

  }
  async save_event() {

  }
  //需要区分proof的父级是event还是relation
  async save_proof() {

  }
  async save_realtion() {

  }
  //区分type
  async delete_line() {

  }

}

module.exports = ManualInputController;
