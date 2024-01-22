import { Status } from './status.model';
import odbc from 'odbc';
import cache from 'memory-cache';
import { CACHE_KEYS } from '../../constants/cacheKeys';

const getStatus = async (): Promise<Status[]> => {
  const cachedResponse = cache.get<Status[]>(CACHE_KEYS.STATUSES);
  if (cachedResponse) {
    return cachedResponse;
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`;
  const connection = await odbc.connect(connString);
  const sqlQueryForStatus = `SELECT popstatus_id as id, popstatus_description as description from popstatus`;
  const status = await connection.query<Status>(sqlQueryForStatus);
  cache.put(CACHE_KEYS.STATUSES, status, 1000 * 60 * 60 * 24);
  return status;
};

export default getStatus;
