export default interface Review {
  product_id: number | string,
  title: string,
  detail: string,
  nickname: string,
  review_entity: string,
  review_status: number,
  customer_id?: number | string | null,
  [k: string]: any
}
