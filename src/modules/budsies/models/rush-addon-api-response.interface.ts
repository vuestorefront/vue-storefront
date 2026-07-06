export default interface RushAddonApiResponse {
  sku: string,
  text: string,
  price: number,
  turnaroundTime: number,
  slotsLeft?: number
}
