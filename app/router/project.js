'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const PREFIXURL = '/project'
module.exports = app => {
	const { router, controller } = app;
	// 路由区域
	router.get(`${PREFIXURL}/get`, controller.project.get);
	router.post(`${PREFIXURL}/add`, controller.project.add);
	router.post(`${PREFIXURL}/del`, controller.project.del);
};
