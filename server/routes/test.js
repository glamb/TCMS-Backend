import express from 'express';
import testCtrl from '../controllers/test';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/:projId/suites/:suiteId/tests/')
  /** GET /api/projects/:projId/suites/:suiteId/tests - Get list of suites for project */
  .get(testCtrl.list)

  /** POST /api/projects/:projId/suites/:suiteId/tests - Create new suite for project */
  .post(testCtrl.create);

router.route('/:projId/suites/:suiteId/tests/:testId')
  /** GET /:projId/suites/:suiteId - Get project */
  .get(testCtrl.get)

  /** PUT /:projId/suites/:suiteId - Update project */
  .put(testCtrl.update)

  /** DELETE /:projId/suites/:suiteId - Delete project */
  .delete(testCtrl.remove);

/** Load project when API with projId route parameter is hit */
router.param('testId', testCtrl.load);

export default router;
