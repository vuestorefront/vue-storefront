export const UPDATE_PRODUCT_DISCOUNT_PRICE_DATA_EVENT_ID = 'UpdateProductDiscountPriceEvent';

export default interface UpdateProductDiscountPriceEventData {
  product: any,
  value?: number
}
