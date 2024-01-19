import { Router } from 'express';
import approverController from './approvers/approvers.controller';
import searchController from './search/search.controller';
import businessUnitController from './businessUnit/businessUnit.controller';

const api = Router()
  .use(approverController)
  .use(searchController)
  .use(businessUnitController);

export default Router().use('/api', api);
