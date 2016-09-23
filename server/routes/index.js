import express from 'express';
import projectRoutes from './project';
import suiteRoutes from './suite';
import testRoutes from './test';
import authRoutes from './auth';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/projects', projectRoutes);
router.use('/projects', suiteRoutes);
router.use('/projects', testRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
