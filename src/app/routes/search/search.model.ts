export interface SearchRequest {
  startDate: Date;
  endDate: Date;
  requisitionNumber: number;
  requisitionStatus: number;
  businessUnit: string;
  type: string;
  vendor: string;
  itemDescription: string;
  requestedBy: string;
  approver: number;
}

export interface SearchResult {
  pophead_id: number;
  pophead_seq: number;
  pophead_businessunit: number;
  popdepot_name: string;
  popstatus_description: string;
  VEN_NM: string;
  pophead_requestedby: string;
  pophead_approver: number;
  pophead_complete: number;
  pophead_recordstatus: number;
  pophead_date: Date;
  pophead_inserdate: Date;
  pophead_comments: string;
  approver_name: string;
}
