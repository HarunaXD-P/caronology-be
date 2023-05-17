'use strict';

const { Controller } = require('egg');
const { MongoClient } = require('mongodb');

const dbUrl = 'mongodb://localhost:27017'

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    //const res=await ctx.service.fileDB.DeleteFileRecord({fileId: 'a'})
    ctx.body = 'hi, egg, this is a test';
  }
}

module.exports = HomeController;
