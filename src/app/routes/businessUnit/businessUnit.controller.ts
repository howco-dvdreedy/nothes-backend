import { NextFunction, Request, Response, Router } from 'express';
import getBusinessUnit from './businessUnit.service';

const router = Router();

/**
 * Get approvers
 * @route {GET} /api/approvers
 * @returns gets list of approvers
 */
router.get('/businessUnit', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const businessUnit = await getBusinessUnit();
    res.json({ businessUnit });
  } catch (error) {
    next(error);
  }
});

export default router;
