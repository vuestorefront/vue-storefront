export interface Order {
  orderId: number,
  id: string,
  url: string
}

export default interface Tracking {
  orders: Order[]
}
