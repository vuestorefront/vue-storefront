import { SetupContext } from '@vue/composition-api';
import { Order } from '@vue-storefront/core/modules/order/types/Order';

export function useOrderCreation ({ root }: SetupContext) {
  function prepareOrderData (paymentAdditionalData: any) {
    const paymentDetails = root.$store.getters['checkout/getPaymentDetails'];
    const shippingDetails = root.$store.getters['checkout/getShippingDetails'];
    const personalDetails = root.$store.getters['checkout/getPersonalDetails'];
    const platformTotals = root.$store.state.cart.platformTotals;
    const isVirtualCart = root.$store.getters['cart/isVirtualCart'];

    const orderData: Order = {
      user_id: root.$store.state.user.current ? root.$store.state.user.current.id.toString() : '',
      cart_id: root.$store.state.cart.cartServerToken ? root.$store.state.cart.cartServerToken.toString() : '',
      products: root.$store.state.cart.cartItems,
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
          region_code: paymentDetails.region_code ? paymentDetails.region_code : '',
          vat_id: paymentDetails.vat_id
        },
        shipping_method_code: shippingDetails.shippingMethod,
        shipping_carrier_code: shippingDetails.shippingCarrier,
        payment_method_code: paymentDetails.paymentMethod,
        payment_method_additional: paymentAdditionalData,
        shippingExtraFields: shippingDetails.extraFields
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
        region_code: shippingDetails.region_code ? shippingDetails.region_code : '',
        vat_id: shippingDetails.vat_id
      }
    }

    return orderData;
  }

  return {
    prepareOrderData
  }
}
