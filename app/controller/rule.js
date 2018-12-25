'use strict';
const resHandle = require('../unit/config').res;
const errorHandle = require('../unit/config').errorHandle;
const Controller = require('egg').Controller;

class RuleController extends Controller {
  async add () {
  	try{
	  	let params = this.ctx.request.body;
	    let addFlag = await this.ctx.service.rule.add(params);
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
  async update () {
  	try{
	  	let params = this.ctx.request.body;
	    let updateFlag = await this.ctx.service.rule.update(params);
	    let result = {}
	    if (updateFlag) {
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
	    let delFlag = await this.ctx.service.rule.del(id);
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
  		let list;
  		let id = this.ctx.request.query.id
  		if (!id) {
  			this.ctx.body = resHandle.error('参数不完整');
  			return false;
  		}
  		list = await this.ctx.service.rule.getListById(id);
	  	let res = {
	  		returnlist: list
	  	};
	  	this.ctx.body = resHandle.success(res);
  	} catch (e) {
  		errorHandle(e, this);
  	}
  }
}

module.exports = RuleController;
