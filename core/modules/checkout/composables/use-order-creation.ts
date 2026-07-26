import { useStore } from '@vue-storefront/core/application-services';
import { Order } from '@vue-storefront/core/modules/order/types/Order';

import ShippingDetails from '../types/ShippingDetails';
import PaymentDetails from '../types/PaymentDetails';

export function useOrderCreation () {
  const applicationStore = useStore();
  function prepareOrderData (paymentAdditionalData: any) {
    const paymentDetails: PaymentDetails = applicationStore.getters['checkout/getPaymentDetails'];
    const shippingDetails: ShippingDetails = applicationStore.getters['checkout/getShippingDetails'];
    const personalDetails = applicationStore.getters['checkout/getPersonalDetails'];
    const platformTotals = applicationStore.state.cart.platformTotals;
    const isVirtualCart = applicationStore.getters['cart/isVirtualCart'];

    const orderData: Order = {
      user_id: applicationStore.state.user.current ? applicationStore.state.user.current.id.toString() : '',
      cart_id: applicationStore.state.cart.cartServerToken ? applicationStore.state.cart.cartServerToken.toString() : '',
      products: applicationStore.state.cart.cartItems,
      addressInformation: {
        billingAddress: {
          region: paymentDetails.state,
          region_id: paymentDetails.region_id ? paymentDetails.region_id : null,
          country_id: paymentDetails.country,
          street: [paymentDetails.streetAddress, paymentDetails.apartmentNumber],
          company: paymentDetails.company,
          telephone: paymentDetails.phoneNumber,
          postcode: paymentDetails.zipCode,
          city: paymentDetails.city,
          firstname: paymentDetails.firstName,
          lastname: paymentDetails.lastName,
          email: personalDetails.emailAddress,
          region_code: '',
          vat_id: paymentDetails.vat_id,
          extension_attributes: paymentDetails.extension_attributes
        },
        shipping_method_code: shippingDetails.shippingMethod,
        shipping_carrier_code: shippingDetails.shippingCarrier,
        payment_method_code: paymentDetails.paymentMethod,
        payment_method_additional: paymentAdditionalData
      },
      paymentDetails: {
        base_grand_total: platformTotals.base_grand_total,
        base_tax_amount: platformTotals.base_tax_amount,
        base_shipping_amount: platformTotals.base_shipping_amount,
        base_subtotal: platformTotals.base_subtotal,
        base_discount_amount: platformTotals.base_discount_amount,
        order_currency_code: platformTotals.quote_currency_code,
        coupon_code: platformTotals.coupon_code
      },
      personalDetails
    }

    if (!isVirtualCart) {
      orderData.addressInformation.shippingAddress = {
        region: shippingDetails.state,
        region_id: shippingDetails.region_id ? shippingDetails.region_id : null,
        country_id: shippingDetails.country,
        street: [shippingDetails.streetAddress, shippingDetails.apartmentNumber],
        company: '',
        telephone: shippingDetails.phoneNumber,
        postcode: shippingDetails.zipCode,
        city: shippingDetails.city,
        firstname: shippingDetails.firstName,
        lastname: shippingDetails.lastName,
        email: personalDetails.emailAddress,
        region_code: '',
        vat_id: shippingDetails.vat_id,
        extension_attributes: shippingDetails.extension_attributes
      }
    }

    return orderData;
  }

  return {
    prepareOrderData
  }
}
