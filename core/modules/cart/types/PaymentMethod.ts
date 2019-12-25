export default interface PaymentMethod {
  default: boolean,
  code?: string,
  cost_incl_tax?: number,
  title?: string
}
