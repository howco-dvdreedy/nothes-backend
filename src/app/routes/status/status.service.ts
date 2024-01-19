import { Status } from './status.model';
import odbc from 'odbc';

const getStatus = async (): Promise<Status[]> => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`
  const connection = await odbc.connect(connString);
  const sqlQueryForStatus = `SELECT popstatus_id as id, popstatus_description as description from popstatus`;
		const status =  await connection.query<Status>(
			sqlQueryForStatus
		);
		return status;
};

export default getStatus;