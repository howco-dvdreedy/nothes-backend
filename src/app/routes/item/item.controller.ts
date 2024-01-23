import { NextFunction, Request, Response, Router } from 'express';
import getItem from './item.service';

const router = Router();

/**
 * Get Item
 * @route {GET} /api/id/{id}
 * @returns gets a single item
 */
router.get(
  '/items/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemID = req.params.id;
      const items = await getItem(itemID);
      res.json({ items });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
