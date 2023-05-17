'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  require('./router/input')(app)
  router.get('/dbtest', controller.home.index);
  router.get('/migration', controller.migration.index)
};
