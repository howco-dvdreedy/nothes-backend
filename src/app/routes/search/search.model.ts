export interface SearchRequest {
  startDate: string;
  endDate: string;
  requisitionNumber: number;
  requisitionStatus: number;
  businessUnit: string;
  type: string;
  vendor: string;
  itemDescription: string;
  requestedBy: string;
  approver: number;
}

export interface SearchResult {}
