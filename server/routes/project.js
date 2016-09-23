import express from 'express';
import projectCtrl from '../controllers/project';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of project */
  .get(projectCtrl.list)

  /** POST /api/projects - Create new project */
  .post(projectCtrl.create);

router.route('/:projId')
  /** GET /api/projects/:projId - Get project */
  .get(projectCtrl.get)

  /** PUT /api/projects/:projId - Update project */
  .put(projectCtrl.update)

  /** DELETE /api/projects/:projId - Delete project */
  .delete(projectCtrl.remove);

/** Load project when API with projId route parameter is hit */
router.param('projId', projectCtrl.load);

export default router;
