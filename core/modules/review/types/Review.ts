export default interface Review {
  product_id: number;
  title: string;
  detail: string;
  nickname: string;
  review_entity: string;
  review_status: number;
  customer_id?: number | null;
  [k: string]: any;
}
