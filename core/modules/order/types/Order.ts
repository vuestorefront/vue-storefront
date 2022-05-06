export interface Order {
  checkout_token?: string,
  order_id?: string,
  created_at?: string,
  updated_at?: string,
  transmited?: boolean,
  transmited_at?: string,
  status?: string,
  state?: string,
  user_id?: string,
  cart_id?: string,
  store_code?: string,
  store_id?: number | string,
  /**
   * Products list
   */
  products: [
    {
      sku: string,
      qty: number,
      name?: string,
      price: number,
      product_type?: string,
      [k: string]: any
    }
  ],
  addressInformation: {
    shippingAddress?: {
      region?: string,
      region_id?: number | string,
      country_id?: string,
      /**
       * Street name
       */
      street: {
        [k: string]: any
      }[],
      company?: string,
      telephone?: string,
      postcode: string,
      city: string,
      /**
       * First name
       */
      firstname: string,
      lastname: string,
      email?: string,
      region_code?: string,
      sameAsBilling?: number,
      [k: string]: any
    },
    billingAddress?: {
      properties?: {
        [k: string]: any
      },
      [k: string]: any
    },
    shipping_method_code?: string,
    shipping_carrier_code?: string,
    payment_method_code?: string,
    payment_method_additional?: any,
    [k: string]: any
  },
  paymentDetails: {
    base_grand_total: number,
    base_tax_amount: number,
    base_shipping_amount: number,
    base_subtotal: number,
    base_discount_amount: number,
    order_currency_code: string,
    coupon_code: string
  },
  personalDetails: {
    emailAddress: string,
    firstName: string,
    lastName: string
  }
}