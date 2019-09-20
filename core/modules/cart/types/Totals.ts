export default interface Totals {
  item_id?: number | string,
  options?: string,
  name: string,
  qty: number,
  row_total: number,
  row_total_incl_tax: number,
  tax_amount: number,
  tax_percent: number
}
