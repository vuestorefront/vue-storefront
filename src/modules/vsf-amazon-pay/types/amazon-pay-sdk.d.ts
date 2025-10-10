declare namespace AmazonPay {
  interface Price {
    amount: string,
    currencyCode: string
  }

  interface Address {
    name: string,
    addressLine1: string,
    addressLine2?: string,
    city: string,
    county?: string,
    district?: string,
    stateOrRegion: string,
    postalCode: string,
    countryCode: string,
    phoneNumber: string
  }

  interface Buyer {
    name: string,
    email: string,
    phoneNumber: string
  }

  interface DeliveryOption {
    id: string,
    price: Price,
    shippingMethod: {
      shippingMethodName: string,
      shippingMethodCode: string
    },
    isDefault: boolean
  }

  interface InitCheckoutEvent {
    shippingAddress?: Address,
    billingAddress?: Address,
    buyer?: Buyer
  }

  interface ShippingAddressSelectionEvent {
    shippingAddress: Address
  }

  interface DeliveryOptionSelectionEvent {
    deliveryOptions?: {
      id: string,
      displayName: string,
      amount: string
    }
  }

  interface CompleteCheckoutEvent {
    amazonCheckoutSessionId: string,
    billingAddress?: Address
  }

  interface UpdateData {
    totalBaseAmount: Price,
    totalTaxAmount: Price,
    totalShippingAmount: Price,
    totalChargeAmount: Price,
    totalOrderAmount?: Price,
    totalDiscountAmount?: Price,
    deliveryOptions?: DeliveryOption[]
  }

  type ProductType = 'PayAndShip' | 'PayOnly'
  type ButtonColor = 'Gold' | 'LightGray' | 'DarkGray'
  type Placement = 'Cart' | 'PaymentSelect' | 'Checkout' | 'Other'
  type PaymentIntent = 'Authorize' | 'AuthorizeWithCapture'
  type Scope = 'name' | 'email' | 'phoneNumber' | 'billingAddress' | 'shippingAddress'

  interface PaymentDetails {
    paymentIntent: PaymentIntent,
    canHandlePendingAuthorization: boolean
  }

  interface CheckoutSessionConfig {
    storeId: string,
    scopes: Scope[],
    paymentDetails: PaymentDetails
  }

  type OnInitCheckoutCallback = (event: InitCheckoutEvent) => Promise<UpdateData>
  type OnShippingAddressSelectionCallback = (event: ShippingAddressSelectionEvent) => Promise<UpdateData>
  type OnDeliveryOptionSelectionCallback = (event: DeliveryOptionSelectionEvent) => Promise<UpdateData>
  type OnCompleteCheckoutCallback = (event: CompleteCheckoutEvent) => Promise<void>
  type OnCancelCallback = () => void

  interface ButtonConfig {
    merchantId: string,
    ledgerCurrency: string,
    productType: ProductType,
    sandbox: boolean,
    placement: Placement,
    buttonColor: ButtonColor,
    estimatedOrderAmount: Price,
    checkoutSessionConfig: CheckoutSessionConfig,
    onInitCheckout: OnInitCheckoutCallback,
    onShippingAddressSelection?: OnShippingAddressSelectionCallback,
    onDeliveryOptionSelection?: OnDeliveryOptionSelectionCallback,
    onCompleteCheckout: OnCompleteCheckoutCallback,
    onCancel?: OnCancelCallback
  }

  interface PaySDK {
    renderJSButton(containerId: string, config: ButtonConfig): Promise<void>
  }

  interface AmazonSDK {
    Pay: PaySDK
  }
}
