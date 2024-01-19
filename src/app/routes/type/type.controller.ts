import { NextFunction, Request, Response, Router } from 'express';
import getType from './type.service';

const router = Router();

/**
 * Get approvers
 * @route {GET} /api/approvers
 * @returns gets list of approvers
 */
router.get('/type', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = await getType();
    res.json({ type });
  } catch (error) {
    next(error);
  }
});

export default router;
