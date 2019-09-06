export default interface Review {
  product_id: any,
  title: string,
  detail: string,
  nickname: string,
  review_entity: string,
  review_status: number,
  customer_id?: any | null,
  [k: string]: any
}
