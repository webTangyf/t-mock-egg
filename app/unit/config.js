'use strict';
const tool = require('./tool')

module.exports = {
	res: {
		success (context, msg) {
			if (tool.getType(context) === 'string') {
				msg = context 
				context = {}
			}
			return {
				retcode: '0000',
				retmsg: msg ? msg : '成功',
				retdata: context ? Object.assign({}, context) : {}
			}
		},
		error (context) {
			return {
				retcode: '1111',
				retmsg: context ? context : '系统异常'
			}
		}
	},
	errorHandle (error, _this) {
		console.error('系统错误：', error);
		_this.ctx.body = {
			retcode: '1111',
			retmsg: '系统错误'
		}
	}
}