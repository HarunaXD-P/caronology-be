'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/dbtest', controller.home.index);
  router.get('/migration', controller.migration.index)
  router.post('/upload_file',controller.upload.index)
};
