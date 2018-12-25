'use strict';
const resHandle = require('../unit/config').res;
const errorHandle = require('../unit/config').errorHandle;
const mockResolve = require('../unit/mockResolve');
const Mock = require('mockjs');
const Controller = require('egg').Controller;

class AppMockController extends Controller {
  async get () {
  	try{
  		let list;
  		let id = this.ctx.request.query.id
  		if (!id) {
  			this.ctx.body = resHandle.error('参数不完整');
  			return false;
  		}
  		list = await this.ctx.service.rule.getListById(id);
	  	let res = {};
      list.forEach(d => {
        if (d.parentId) {
          return false
        }
        let item = mockResolve(d)
        let rule = item.rule;
        let [rulename, rulecontent] = rule.split(':')
        rulecontent = rulecontent.trim()
        if (item.type === 'number') {
          rulecontent = Number(rulecontent)
        }
        if (item.type === 'boolean') {
          rulecontent = rulecontent === 'true'
        }
        res[rulename.trim()] = rulecontent
        if (item.type === 'array' || item.type === 'object') {
          res[rulename.trim()] = resolveDeepStruct(d, list)
        }
      })
      console.log(res)
	  	this.ctx.body = Mock.mock(res)
  	} catch (e) {
  		errorHandle(e, this);
  	}
  }
}

function resolveDeepStruct (rootItem, list) {
  let res = {}
  let id = rootItem.id
  list.forEach (d => {
    if (d.parentId != id) {
      return false
    }
    let item = mockResolve(d)
    let rule = item.rule;
    let [rulename, rulecontent] = rule.split(':')
    rulecontent = rulecontent.trim()
    if (item.type === 'number') {
      rulecontent = Number(rulecontent)
    }
    if (item.type === 'boolean') {
      rulecontent = rulecontent === 'true'
    }
    res[rulename.trim()] = rulecontent
    // 如果为引用类型继续递归
    if (item.type === 'array' || item.type === 'object') {
      res[rulename.trim()] = resolveDeepStruct(d, list)
    }
  })
  if (rootItem.type === 'object') {
    return res
  }
  return [res]
}

module.exports = AppMockController;
