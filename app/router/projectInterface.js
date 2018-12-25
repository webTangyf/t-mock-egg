'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const PREFIXURL = '/projectInterface'
module.exports = app => {
	const { router, controller } = app;
	// 路由区域
	router.get(`${PREFIXURL}/get`, controller.projectInterface.get);
	router.post(`${PREFIXURL}/add`, controller.projectInterface.add);
	router.post(`${PREFIXURL}/update`, controller.projectInterface.update);
	router.post(`${PREFIXURL}/del`, controller.projectInterface.del);
};
