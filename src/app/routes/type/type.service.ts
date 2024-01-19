import { Type } from './type.model';
import odbc from 'odbc';

const getType = async (): Promise<Type[]> => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`
  const connection = await odbc.connect(connString);
  const sqlQueryForType = `SELECT poptype_id as id, poptype_description as description from poptype`;
		const type =  await connection.query<Type>(
			sqlQueryForType
		);
		return type;
};

export default getType;