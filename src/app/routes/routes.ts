import { Router } from 'express';
import approverController from './approvers/approvers.controller';
import searchController from './search/search.controller';
import businessUnitController from './businessUnit/businessUnit.controller';
import statusController from './status/status.controller';
import typeController from './type/type.controller';
import itemController from './item/item.controller';

const api = Router()
  .use(approverController)
  .use(searchController)
  .use(businessUnitController)
  .use(statusController)
  .use(typeController)
  .use(itemController);

export default Router().use('/api', api);
