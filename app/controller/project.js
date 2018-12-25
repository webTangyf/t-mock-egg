'use strict';
const resHandle = require('../unit/config').res;
const errorHandle = require('../unit/config').errorHandle;
const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async add () {
  	try{
	  	let name = this.ctx.request.body.name;
	  	if (!name) {
	  		this.ctx.body = resHandle.error('参数不完整');
	  		return false;
	  	}
	    let addFlag = await this.ctx.service.project.add(name);
	    let result = {}
	    if (addFlag) {
	    	result = resHandle.success('添加成功');
	    } else {
	    	result = resHandle.error();
	    }
	    this.ctx.body = result;
  	} catch (e) {
  		console.log(e)
  		errorHandle(e, this);
  	}
  }
  async del () {
  	try{
	  	let id = this.ctx.request.body.id;
	  	if (!id) {
	  		this.ctx.body = resHandle.error('参数不完整');
	  		return false;
	  	}
	    let delFlag = await this.ctx.service.project.del(id);
	    let result = {}
	    if (delFlag) {
	    	result = resHandle.success('删除成功');
	    } else {
	    	result = resHandle.error();
	    }
	    this.ctx.body = result;
  	} catch (e) {
  		console.log(e)
  		errorHandle(e, this);
  	}
  }
  async get () {
  	try{
	  	let list = await this.ctx.service.project.getAll();
	  	let res = {
	  		returnlist: list
	  	};
	  	this.ctx.body = resHandle.success(res);
  	} catch (e) {
  		errorHandle(e, this);
  	}
  }
}

module.exports = ProjectController;
