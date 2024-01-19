import { NextFunction, Request, Response, Router } from 'express';
import getStatus from './status.service';

const router = Router();

/**
 * Get status
 * @route {GET} /api/status
 * @returns gets list of status
 */
router.get('/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = await getStatus();
    res.json({ status });
  } catch (error) {
    next(error);
  }
});

export default router;
