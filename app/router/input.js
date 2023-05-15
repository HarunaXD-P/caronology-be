'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/input/upload_file', controller.manualInput.upload_file)

  router.get('/input/get_file_list', controller.manualInput.get_file_list)
  router.get('/input/get_year_list', controller.manualInput.get_year_list)
  router.get('/input/get_event_list', controller.manualInput.get_event_list)
  router.get('/input/get_proof_list', controller.manualInput.get_proof_list)
  router.get('/input/get_relation_list', controller.manualInput.get_relation_list)

  router.post('/input/save_year', controller.manualInput.save_year)
  router.post('/input/save_event', controller.manualInput.save_event)
  router.post('/input/save_proof', controller.manualInput.save_proof)
  router.post('/input/save_relation', controller.manualInput.save_realtion)

  router.post('/input/delete_record', controller.manualInput.delete_line)

  router.post('/input/test_post', controller.manualInput.save_proof)
  router.get('/input/get_year_event', controller.manualInput.get_year_event)
  router.get('/input/get_event_proof', controller.manualInput.get_event_proof)
  router.post('/input/edit_proof', controller.manualInput.edit_proof)
  router.get('/input/delete_proof', controller.manualInput.delete_proof)
};
