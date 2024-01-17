import { Router } from 'express';
import approverController from './approvers/approvers.controller';


const api = Router()
  .use(approverController)

export default Router().use('/api', api);
