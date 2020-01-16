import { UseCheckout } from '@vue-storefront/interfaces';
import { ref, reactive } from '@vue/composition-api'

// TODO: Temporary interface. It should've been discussed and moved somewhere else
interface PaymentMethod {
  name: string
}

// TODO: Temporary interface. It should've been discussed and moved somewhere else
interface ShippingMethod {

}

const PAYMENT_METHODS_MOCK: PaymentMethod[] = [
  {
    name: 'PayPal'
  },
  {
    name: 'Skrill'
  }
]
const SHIPPING_METHODS_MOCK: ShippingMethod[] = [
  {
    name: 'UPC'
  },
  {
    name: 'FedEx'
  }
]

export default function useCheckout (): UseCheckout<PaymentMethod[], ShippingMethod[], any, any, any, any, any, any, any, any> {
  const paymentMethods = reactive([])
  const shippingMethods = reactive([])
  const personalDetails = ref(null)
  const shippingDetails = ref(null)
  const choosenPaymentMethod = ref(null)
  const choosenShippingMethod = ref(null)

  const setPersonalDetails = (details: any) => {
    personalDetails.value = details
  }
  const setPaymentMethod = (paymentMethod: any) => {
    choosenPaymentMethod.value = paymentMethod
  }
  const setShippingMethod = (shippingMethod: any) => {
    choosenShippingMethod.value = shippingMethod
  }
  const placeOrder = async () => {
    console.log('useCheckout:placeOrder')
  }

  const loading = ref(true)
  const error = ref(null)

  return {
    paymentMethods,
    shippingMethods,
    personalDetails,
    shippingDetails,
    choosenPaymentMethod,
    choosenShippingMethod,
    setPersonalDetails,
    setPaymentMethod,
    setShippingMethod,
    placeOrder,
    loading,
    error
  }
}