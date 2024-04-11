export interface Item {
  id: string;
  name: string;
  description: string;
  measurement_units: string;
  deposit: string;
  code: string;
  min_quantity: number;
  price: number;
  rent_price: number;
  accounting_price: number;
  type: string;
  custom_values: [];
}
export type ItemsResult = {
    result: Item[],
    total: number
}
