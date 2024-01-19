import { Item } from './item.model';
import odbc from 'odbc';

const getItem = async (id: string): Promise<Item> => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`;
  const connection = await odbc.connect(connString);
  const sqlQueryForItem = `select * from popitem where (popitem_popheadid = ${id})`;
  const itemsResult = await connection.query<Item>(sqlQueryForItem);
    if(itemsResult.length === 0) {
        throw new Error('Item not found');
    }

    if (itemsResult && itemsResult.length > 0) {
        return itemsResult[0];
    }
};

export default getItem;
