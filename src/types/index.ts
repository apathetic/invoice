
export interface RootState {
  discounts: number;
  tax: number;
  shipping: number;
  items: LineItem[];
  id: number;
}

export interface LineItem {
  description?: string;
  quantity?: number;
  rate?: number;
  amount?: number;
  lineTotal: number;
  id: number;
}
