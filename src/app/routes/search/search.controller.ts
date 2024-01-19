import { NextFunction, Request, Response, Router } from 'express';
import search from './search.service';
import { SearchRequest } from './search.model';

const router = Router();

/**
 * Get approvers
 * @route {GET} /api/approvers
 * @returns gets list of approvers
 */
router.post('/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchRequest = req.body as SearchRequest;
    const searchResults = await search(searchRequest);
    res.json({ searchResults });
  } catch (error) {
    next(error);
  }
});

export default router;
