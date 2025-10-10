<template>
  <div class="payment-amazon-pay">
    <div class="_amazon-pay-container" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from '@vue/composition-api'
import config from 'config';

import { DEFAULT_CURRENCY_CODE, ExpressCheckoutData, getFirstAndLastFromFullName, getRegionIdByCountryAndStateCode, PaymentType } from 'src/modules/shared'

import { MODULE_NAME } from '../types/module-name';
import { SET_AMAZON_SESSION_ID } from '../types/mutations';
import { SupportedMethodCodes } from '../types/supported-method-codes';

type AdditionalAddressData = ExpressCheckoutData.AdditionalAddressData;
type ExpressCheckoutAuthorizedCallbackData = ExpressCheckoutData.ExpressCheckoutAuthorizedCallbackData<SupportedMethodCodes>;
type ExpressCheckoutUpdateData = ExpressCheckoutData.ExpressCheckoutUpdateData;
type MainAddressData = ExpressCheckoutData.MainAddressData;
type ShippingDetailsChangedCallbackData = ExpressCheckoutData.ShippingDetailsChangedCallbackData

function getPrice (value: number): AmazonPay.Price {
  return {
    amount: value.toString(10),
    currencyCode: DEFAULT_CURRENCY_CODE
  }
}

function useCustomerData () {
  function defaultAdditionalDataAddressFactory (): AdditionalAddressData {
    return {
      firstName: '',
      lastName: '',
      streetAddress: ''
    };
  }

  function defaultCustomerDataFactory (): ExpressCheckoutAuthorizedCallbackData['customer'] {
    return {
      firstName: '',
      lastName: '',
      emailAddress: ''
    };
  }

  function defaultMainAddressDataFactory (): MainAddressData {
    return {
      country: '',
      city: '',
      state: '',
      region_id: null,
      zipCode: ''
    }
  }

  let customer = defaultCustomerDataFactory();

  let shippingAddressAdditionalData = defaultAdditionalDataAddressFactory();

  let billingAddressAdditionalData = defaultAdditionalDataAddressFactory();

  let billingAddressMainData = defaultMainAddressDataFactory();

  function clearData () {
    shippingAddressAdditionalData = defaultAdditionalDataAddressFactory();
    billingAddressAdditionalData = defaultAdditionalDataAddressFactory();
    billingAddressMainData = defaultMainAddressDataFactory();
    customer = defaultCustomerDataFactory();
  }

  function updateCustomer (buyer: AmazonPay.Buyer) {
    const { firstName, lastName } = getFirstAndLastFromFullName(buyer.name);

    customer.emailAddress = buyer.email;
    customer.firstName = firstName;
    customer.lastName = lastName;
  }

  function updateBillingAddress (billingAddress: AmazonPay.Address) {
    const regionId = getRegionIdByCountryAndStateCode(
      billingAddress.countryCode,
      billingAddress.stateOrRegion
    );

    const state = regionId === null ? billingAddress.stateOrRegion : '';

    billingAddressMainData = {
      country: billingAddress.countryCode,
      city: billingAddress.city,
      zipCode: billingAddress.postalCode,
      state: state,
      region_id: regionId
    }

    const { firstName, lastName } = getFirstAndLastFromFullName(billingAddress.name);

    billingAddressAdditionalData = {
      firstName,
      lastName,
      streetAddress: billingAddress.addressLine1 + (billingAddress.addressLine2 || '')
    }
  }

  function updateShippingAddress (shippingAddress: AmazonPay.Address) {
    const { firstName, lastName } = getFirstAndLastFromFullName(shippingAddress.name);

    shippingAddressAdditionalData = {
      firstName,
      lastName,
      streetAddress: shippingAddress.addressLine1 + (shippingAddress.addressLine2 || '')
    }
  }

  function getData () {
    return {
      customer,
      billingAddressAdditionalData,
      billingAddressMainData,
      shippingAddressAdditionalData
    }
  }

  return {
    clearData,
    getData,
    updateBillingAddress,
    updateCustomer,
    updateShippingAddress
  }
}

export default defineComponent({
  props: {
    onExpressCheckoutAuthorized: {
      type: Function as PropType<((data: ExpressCheckoutAuthorizedCallbackData) => Promise<void>) | undefined>,
      default: undefined
    },
    onShippingDetailsChanged: {
      type: Function as PropType<((data: ShippingDetailsChangedCallbackData) => Promise<ExpressCheckoutUpdateData>) | undefined>,
      default: undefined
    },
    type: {
      type: String as PropType<PaymentType>,
      default: PaymentType.PAYMENT
    }
  },
  setup (props, { emit, root }) {
    const isExpressCheckout = computed<boolean>(() => {
      return props.type === PaymentType.EXPRESS_CHECKOUT;
    });

    const isShippingAddressRequired = computed<boolean>(() => {
      return isExpressCheckout && !root.$store.getters['cart/isVirtualCart'];
    });

    const customerData = useCustomerData();

    function generateUpdateDataObject (result: ExpressCheckoutUpdateData): AmazonPay.UpdateData {
      const deliveryOptions: AmazonPay.DeliveryOption[] = [];

      for (const option of result.availableShippingMethods) {
        if (
          !option.price_incl_tax || !option.method_title || !option.method_code || !option.carrier_code
        ) {
          continue;
        }

        deliveryOptions.push(
          {
            id: option.carrier_code,
            price: {
              amount: option.price_incl_tax.toString(10),
              currencyCode: DEFAULT_CURRENCY_CODE
            },
            shippingMethod: {
              shippingMethodCode: option.method_code,
              shippingMethodName: option.method_title
            },
            isDefault: result.selectedShippingMethod === option.method_code
          }
        );
      }

      return {
        totalBaseAmount: getPrice(result.total.base),
        totalTaxAmount: getPrice(result.total.tax),
        totalShippingAmount: getPrice(result.total.shipping),
        totalChargeAmount: getPrice(result.total.final),
        totalDiscountAmount: getPrice(result.total.discount),
        deliveryOptions
      }
    }

    async function onAddressUpdate (shippingAddress?: AmazonPay.Address): Promise<AmazonPay.UpdateData> {
      if (!props.onShippingDetailsChanged) {
        throw new Error('onShippingDetailsChanged is not defined');
      }

      let shippingAddressData: MainAddressData | undefined;

      if (shippingAddress) {
        const regionId = getRegionIdByCountryAndStateCode(
          shippingAddress.countryCode,
          shippingAddress.stateOrRegion
        );

        const state = regionId === null ? shippingAddress.stateOrRegion : '';
        shippingAddressData = {
          country: shippingAddress.countryCode,
          city: shippingAddress.city,
          state,
          region_id: regionId,
          zipCode: shippingAddress.postalCode
        }

        customerData.updateShippingAddress(shippingAddress);
      }

      const result = await props.onShippingDetailsChanged({
        shippingAddress: shippingAddressData,
        paymentAddress: customerData.getData().billingAddressMainData
      });

      return generateUpdateDataObject(result);
    }

    async function renderAmazonPayButton () {
      const amazon = window.amazon;

      if (!amazon) {
        return;
      }

      const scopes: AmazonPay.Scope[] = ['name', 'email', 'phoneNumber', 'billingAddress'];
      let productType: AmazonPay.ProductType = 'PayOnly';

      if (isShippingAddressRequired) {
        scopes.push('shippingAddress');
        productType = 'PayAndShip';
      }

      try {
        const button = await amazon.Pay.renderJSButton('._amazon-pay-container', {
          merchantId: config.amazonPay.merchantId,
          ledgerCurrency: DEFAULT_CURRENCY_CODE,
          productType,
          sandbox: config.amazonPay.sandbox,
          placement: 'Cart',
          buttonColor: 'Gold',
          // TODO: replace with actual total
          estimatedOrderAmount: { 'amount': '109.99', 'currencyCode': DEFAULT_CURRENCY_CODE },
          checkoutSessionConfig: {
            storeId: config.amazonPay.storeId,
            scopes,
            paymentDetails: {
              paymentIntent: 'Authorize',
              canHandlePendingAuthorization: false
            }
          },
          onInitCheckout: async function (event) {
            if (!props.onShippingDetailsChanged) {
              throw new Error('onShippingDetailsChanged is not defined');
            }

            customerData.clearData();

            if (event.buyer) {
              customerData.updateCustomer(event.buyer);
            }

            if (event.billingAddress) {
              customerData.updateBillingAddress(event.billingAddress);
            }

            if (event.shippingAddress) {
              customerData.updateShippingAddress(event.shippingAddress);
            }

            emit('payment-started');

            return onAddressUpdate(event.shippingAddress);
          },
          onShippingAddressSelection: function (event) {
            return onAddressUpdate(event.shippingAddress);
          },
          onDeliveryOptionSelection: async function (event) {
            if (!props.onShippingDetailsChanged) {
              throw new Error('onShippingDetailsChanged is not defined');
            }

            const result = await props.onShippingDetailsChanged({
              shippingMethod: event.deliveryOptions?.id
            });

            return generateUpdateDataObject(result);
          },
          onCompleteCheckout: async function (event) {
            if (!props.onExpressCheckoutAuthorized) {
              throw new Error('onExpressCheckoutAuthorized is not defined');
            }

            root.$store.commit(`${MODULE_NAME}/${SET_AMAZON_SESSION_ID}`, event.amazonCheckoutSessionId);

            const data = customerData.getData();

            await props.onExpressCheckoutAuthorized({
              paymentMethod: SupportedMethodCodes.AMAZON_PAY,
              customer: data.customer,
              shippingDetails: data.shippingAddressAdditionalData,
              paymentDetails: data.billingAddressAdditionalData
            });

            emit('success');
            customerData.clearData();
          },
          onCancel: function () {
            customerData.clearData();
          }
        });

        console.log(button);
      } catch (error) {
      }
    }

    onMounted(() => {
      renderAmazonPayButton();
    });

    // TODO: watch for virtual cart and update payment button options
  }
});
</script>

<style lang="scss" scoped>
.payment-amazon-pay {
  //
}
</style>
