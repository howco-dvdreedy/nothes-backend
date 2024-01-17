import { NextFunction, Request, Response, Router } from 'express';
import getApprovers from './approvers.service';

const router = Router();

/**
 * Get approvers
 * @route {GET} /api/approvers
 * @returns gets list of approvers
 */
router.get('/approvers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approvers = await getApprovers();
    res.json({ approvers });
  } catch (error) {
    next(error);
  }
});

export default router;
