'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  require('./router/project')(app);
  require('./router/projectInterface')(app);
  require('./router/rule')(app);
  require('./router/appMock')(app);
};
