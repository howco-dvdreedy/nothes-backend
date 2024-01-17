import { Approver } from './approver.model';
import odbc from 'odbc';

const getApprovers = async (): Promise<Approver[]> => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`
  const connection = await odbc.connect(connString);
  const sqlQueryForApprover = `SELECT Distinct
		--PA.popauth_id
		PA.popauth_iportuserid
				, PU.iPortUserid  
				, PU.[Login]  
				, PU.Firstname  
				, PU.Lastname
	FROM dbo.popauth PA
		INNER JOIN [v410howco_iport_live].dbo.iPortUser PU
		ON PU.iportuserid = PA.popauth_iportuserid
	WHERE PA.popauth_recordstatus = 1
	--AND PA.popauth_iportuserid = 1780;	
	ORDER BY PU.Firstname, PU.Lastname;	
		`;
		return await connection.query<Approver>(
			sqlQueryForApprover
		);
};

export default getApprovers;
