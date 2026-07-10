export default interface RushAddonApiResponse {
  sku: string,
  text: string,
  price: number,
  turnaround_time: number,
  slots_left?: number
}
