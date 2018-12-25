'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const PREFIXURL = '/rule'
module.exports = app => {
	const { router, controller } = app;
	// 路由区域
	router.get(`${PREFIXURL}/get`, controller.rule.get);
	router.post(`${PREFIXURL}/add`, controller.rule.add);
	router.post(`${PREFIXURL}/update`, controller.rule.update);
	router.post(`${PREFIXURL}/del`, controller.rule.del);
};
