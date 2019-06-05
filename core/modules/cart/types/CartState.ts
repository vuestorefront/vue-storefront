export default interface CartState {
  isMicrocartOpen: boolean,
  itemsAfterPlatformTotals: any,
  platformTotals: any,
  platformTotalSegments: any,
  cartIsLoaded: boolean,
  bypassToAnon: boolean,
  cartServerToken: string,
  shipping: any,
  payment: any,
  cartItemsHash: string,
  bypassCount: number,
  cartItems: any[]
}
