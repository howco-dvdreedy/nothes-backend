export interface Item {
  id: number;
  description: string;
  approvalstatus: string;
  dueDate: string;
  quantity: number;
  price: number;
  department: string;
  glNumber: string;
  delivered: string;
  invoiced: string;
}

export interface ItemResponse {
  popitem_approvalstatus: number;
  popitem_approvedby: number;
  popitem_approveddate: Date | null;
  popitem_auditdate: Date | null;
  popitem_auditedby: number;
  popitem_contractorcost: number | null;
  popitem_contractorhours: number | null;
  popitem_department: string;
  popitem_description: string;
  popitem_duedate: string;
  popitem_glnumber: string;
  popitem_insertby: number;
  popitem_insertdate: Date;
  popitem_invoicenumber: string | null;
  popitem_itemnumber: number;
  popitem_lastupdate: Date;
  popitem_lastupdateby: number;
  popitem_machinenumber: string | null;
  popitem_numcontractors: number | null;
  popitem_orderno: string | null;
  popitem_plant: string;
  popitem_popheadid: number;
  popitem_popheadseq: number;
  popitem_price: number;
  popitem_pricevariance: number | null;
  popitem_qty: number;
  popitem_reason: string | null;
  popitem_recordstatus: number;
  popitem_type: number;
  popitem_vessel: string | null;
  popitem_weight: number | null;
}
