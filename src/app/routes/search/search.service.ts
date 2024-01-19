import { SearchRequest, SearchResult } from './search.model';
import odbc from 'odbc';

const getApprovers = async (
  searchRequest: SearchRequest
): Promise<SearchResult[]> => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const connString = `Driver={SQL Server};Server=s-cu-hessql.howcogroup.com;Database=howco_dw_live;Trusted_Connection=Yes;UID=${user};PWD=${password};`;
  const connection = await odbc.connect(connString);
  const storedProcedureName = 'howcospgpopsearchsummaryNotNew';
  const paramsMap = new Map<string, string | undefined>([
    ['pophead_id', searchRequest.requisitionNumber],
    ['pophead_status', searchRequest.requisitionStatus],
    ['pophead_businessunit', searchRequest.businessUnit],
    ['pophead_type', searchRequest.type],
    ['pophead_vendor', searchRequest.vendor],
    ['pophead_requestedby', searchRequest.requestedBy],
    ['pophead_approver', searchRequest.approver],
    ['mindate', searchRequest.startDate],
    ['maxdate', searchRequest.endDate],
    ['popitem_description', searchRequest.itemDescription],
  ] as Iterable<readonly [string, string | undefined]>);

  const allValuesUndefined = Array.from(paramsMap.values()).every(value => value === undefined);
  if (allValuesUndefined) {
    throw new Error('At least one parameter required');
  }

  let query = `EXEC ${storedProcedureName}`;
  for (const [key, value] of paramsMap) {
    if (value) {
      query += ` @${key} = '${value}'`;
    }
  }
  
  const searchResults = await connection.query(query);
  return searchResults;
};

export default getApprovers;
