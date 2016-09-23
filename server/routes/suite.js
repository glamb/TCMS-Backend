import express from 'express';
import suiteCtrl from '../controllers/suite';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/:projId/suites/')
  /** GET /api/projects/:projId/suites/:suiteId - Get list of suites for project */
  .get(suiteCtrl.list)

  /** POST /api/projects/:projId/suites/:suiteId - Create new suite for project */
  .post(suiteCtrl.create);

router.route('/:projId/suites/:suiteId')
  /** GET /:projId/suites/:suiteId - Get project */
  .get(suiteCtrl.get)

  /** PUT /:projId/suites/:suiteId - Update project */
  .put(suiteCtrl.update)

  /** DELETE /:projId/suites/:suiteId - Delete project */
  .delete(suiteCtrl.remove);

/** Load project when API with projId route parameter is hit */
router.param('suiteId', suiteCtrl.load);

export default router;
