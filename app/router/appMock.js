'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const PREFIXURL = '/app/mock'
module.exports = app => {
	const { router, controller } = app;
	// 路由区域
	router.get(`${PREFIXURL}/get`, controller.appMock.get);
};
