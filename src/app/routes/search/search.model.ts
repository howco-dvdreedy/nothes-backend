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

export interface SearchResult {}
