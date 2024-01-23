import { CACHE_KEYS } from '../../constants/cacheKeys';
import { BusinessUnit } from '../businessUnit/businessUnit.model';
import { Status } from '../status/status.model';
import { Item, ItemResponse } from './item.model';
import cache from 'memory-cache';
import odbc from 'odbc';

const getItem = async (id: string): Promise<Item[]> => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`;
  const connection = await odbc.connect(connString);
  const sqlQueryForItem = `select * from popitem where (popitem_popheadid = ${id})`;
  const itemsResult = await connection.query<ItemResponse>(sqlQueryForItem);
  const cachedBusinessUnit = cache.get<BusinessUnit[]>(
    CACHE_KEYS.BUSINESS_UNITS
  );
  const businessUnitMap = new Map<string, string>(
    cachedBusinessUnit.map((businessUnit: BusinessUnit) => [
      businessUnit.id.toString(),
      businessUnit.name,
    ])
  );
  const cachedStatus = cache.get<Status[]>(CACHE_KEYS.STATUSES);
  const statusMap = new Map<number, string>(
    cachedStatus.map((status: Status) => [status.id, status.description])
  );

  console.log(businessUnitMap, itemsResult)
  
  function mapItemResponse(itemResponse: ItemResponse): Item {
    return {
      id: itemResponse.popitem_popheadid,
      approvalstatus: statusMap.get(itemResponse.popitem_approvalstatus),
      description: itemResponse.popitem_description,
      delivered: itemResponse.popitem_duedate,
      quantity: itemResponse.popitem_qty,
      price: itemResponse.popitem_price,
      dueDate: itemResponse.popitem_duedate,
      glNumber: itemResponse.popitem_glnumber,
      //   delivered: itemResponse.popitem_delivered,
      invoiced: itemResponse.popitem_invoicenumber,
      department: businessUnitMap.get(itemResponse.popitem_department),
    };
  }
  if (itemsResult.length === 0) {
    throw new Error('Item not found');
  }

  if (itemsResult && itemsResult.length > 0) {
    return itemsResult.map((item: ItemResponse) => {
      return mapItemResponse(item);
    });
  }
};

export default getItem;
