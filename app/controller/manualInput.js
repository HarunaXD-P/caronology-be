'use strict';
const path = require('path');
const fs = require('mz/fs');
const pump = require('mz-modules/pump');
var md5 = require("md5");
const { Controller } = require('egg');
const { error } = require('console');

class ManualInputController extends Controller {
  async upload_file() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    // 获取文件名称
    const filename = file.filename;
    const targetPath = path.join('app/public/upload', filename);
    // 读取文件
    const source = fs.createReadStream(file.filepath);
    // 创建写入流
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source, target);
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
    const req = ctx.request.body
    try {
      let response = await ctx.service.fileDB.FindFileRecord(req)
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }

  }
  async get_year_list() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response = await ctx.service.yearDB.FindYearRecord(req)
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }

  }
  async get_event_list() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response = await ctx.service.eventDB.FindEventRecord(req)
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }
  }
  async get_proof_list() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response = await ctx.service.proofDB.FindProofRecord(req)
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }

  }
  async get_relation_list() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response = await ctx.service.relationDB.FindRelationRecord(req)
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }


  }
  //创建新条目和修改旧条目都用这个
  //req中应该有type，target_id, target_info
  //type = 0 代表新增，  type= 1 代表修改
  async save_year() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response
      if (req.type == 0) {
        response = await ctx.service.yearDB.AddYearRecord(req.target_info)
      } else if (req.type == 1) {
        response = await ctx.service.yearDB.ModifyYearRecord({ yearId: req.target_id }, req.target_info)
      } else {
        throw new error('参数错误')
      }
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }
  }
  async save_event() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response
      if (req.type == 0) {
        response = await ctx.service.eventDB.AddEventRecord(req.target_info)
      } else if (req.type == 1) {
        response = await ctx.service.eventDB.ModifyEventRecord({ eventId: req.target_id }, req.target_info)
      } else {
        throw new error('参数错误')
      }
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }
  }
  //需要区分proof的父级是event还是relation
  async save_proof() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response
      if (req.type == 0) {
        response = await ctx.service.proofDB.AddProofRecord(req.target_info)
      } else if (req.type == 1) {
        response = await ctx.service.proofDB.ModifyProofRecord({ proofId: req.target_id }, req.target_info)
      } else {
        throw new error('参数错误')
      }
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }
  }
  async save_realtion() {
    const { ctx } = this;
    const req = ctx.request.body
    try {
      let response
      if (req.type == 0) {
        response = await ctx.service.relationDB.AddRelationRecord(req.target_info)
      } else if (req.type == 1) {
        response = await ctx.service.relationDB.AddRelationRecord({ relationId: req.target_id }, req.target_info)
      } else {
        throw new error('参数错误')
      }
      ctx.body = {
        status: 'ok',
        data: response
      }
    } catch (e) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }
  }
  //区分type
  async delete_line() {
    const { ctx } = this
    const req = ctx.request.body
    try {
      let response
      switch (req.type) {
        case 0:
          response = await ctx.service.fileDB.DeleteFileRecord({ fileId: req.target_id })
          break;
        case 1:
          response = await ctx.service.yearDB.DeleteYearRecord({ yearId: req.target_id })
          break;
        case 2:
          response = await ctx.service.eventDB.DeleteEventRecord({ eventId: req.target_id })
          break;
        case 3:
          response = await ctx.service.proofDB.DeleteProofRecord({ proofId: req.target_id })
          break;
        case 4:
          response = await ctx.service.relationDB.DeleteRelationRecord({ realtionId: req.target_id })
          break;
        default:
          throw new error('错误类型')
      }
    } catch (error) {
      ctx.body = {
        status: 'failed',
        data: {}
      }
    }
  }
}

module.exports = ManualInputController;
