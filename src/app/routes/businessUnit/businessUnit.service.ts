import { BusinessUnit } from './businessUnit.model';
import odbc from 'odbc';
import cache from 'memory-cache';
import { CACHE_KEYS } from '../../constants/cacheKeys';

const getBusinessUnit = async (): Promise<BusinessUnit[]> => {
  const cachedResponse = cache.get<BusinessUnit[]>(CACHE_KEYS.BUSINESS_UNITS);
  if (cachedResponse) {
    return cachedResponse;
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`;
  const connection = await odbc.connect(connString);
  const sqlQueryForBusinessUnit = `SELECT popdepot_id as id, popdepot_name as name from popdepot`;
  const businessUnits = await connection.query<BusinessUnit>(
    sqlQueryForBusinessUnit
  );
  cache.put(CACHE_KEYS.BUSINESS_UNITS, businessUnits, 1000 * 60 * 60 * 24);
  return businessUnits;
};

export default getBusinessUnit;
