import { Approver } from './approver.model';
import odbc from 'odbc';
import cache from 'memory-cache';
import { CACHE_KEYS } from '../../constants/cacheKeys';

const getApprovers = async (): Promise<Approver[]> => {
  const cachedResponse = cache.get<Approver[]>(CACHE_KEYS.APPROVERS);
  if (cachedResponse) {
    return cachedResponse;
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`;
  const connection = await odbc.connect(connString);
  const sqlQueryForApprover = `SELECT Distinct
		--PA.popauth_id
		PA.popauth_iportuserid
				, PU.iPortUserId  
				, PU.[Login]  
				, PU.FirstName  
				, PU.LastName
	FROM dbo.popauth PA
		INNER JOIN [v410howco_iport_live].dbo.iPortUser PU
		ON PU.iportuserid = PA.popauth_iportuserid
	WHERE PA.popauth_recordstatus = 1
	--AND PA.popauth_iportuserid = 1780;	
	ORDER BY PU.Firstname, PU.Lastname;	
		`;
  const approvers = await connection.query<Approver>(sqlQueryForApprover);
  approvers.forEach((approver) => {
    approver.FirstName = approver.FirstName.trim();
    approver.LastName = approver.LastName.trim();
    approver.Login = approver.Login.trim();
  });
  cache.put(CACHE_KEYS.APPROVERS, approvers, 1000 * 60 * 60 * 24);
  return approvers;
};

export default getApprovers;
