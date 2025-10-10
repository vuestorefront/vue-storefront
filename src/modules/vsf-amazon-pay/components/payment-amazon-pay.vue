<template>
  <div class="payment-amazon-pay" v-if="canUseAmazonPay">
    <div class="_amazon-pay-container" v-if="showContainer" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, PropType, ref, watch } from '@vue/composition-api'
import config from 'config';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { Logger } from '@vue-storefront/core/lib/logger';
import {
  useExpressCheckoutTotals,
  DEFAULT_CURRENCY_CODE,
  ExpressCheckoutData,
  getFirstAndLastFromFullName,
  getRegionIdByCountryAndStateCode,
  PaymentType,
  PAYMENT_ERROR_EVENT
} from 'src/modules/shared'

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
      streetAddress: '',
      phoneNumber: ''
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

  function getStreetAddress (address: AmazonPay.Address): string {
    if (!address.addressLine2) {
      return address.addressLine1;
    }

    return `${address.addressLine1} ${address.addressLine2}`;
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
      streetAddress: getStreetAddress(billingAddress),
      phoneNumber: billingAddress.phoneNumber
    }
  }

  function updateShippingAddress (shippingAddress: AmazonPay.Address) {
    const { firstName, lastName } = getFirstAndLastFromFullName(shippingAddress.name);

    shippingAddressAdditionalData = {
      firstName,
      lastName,
      streetAddress: getStreetAddress(shippingAddress),
      phoneNumber: shippingAddress.phoneNumber
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
  setup (props, context) {
    const emit = context.emit;
    const root = context.root;

    const { expressCheckoutTotals } = useExpressCheckoutTotals(context);

    const isExpressCheckout = computed<boolean>(() => {
      return props.type === PaymentType.EXPRESS_CHECKOUT;
    });

    const isShippingAddressRequired = computed<boolean>(() => {
      return isExpressCheckout.value && !root.$store.getters['cart/isVirtualCart'];
    });

    const canUseAmazonPay = computed<boolean>(() => {
      return isShippingAddressRequired.value;
    });

    const customerData = useCustomerData();

    function getTotalsData (totals: ExpressCheckoutUpdateData['total']): AmazonPay.SuccessUpdateData {
      return {
        totalBaseAmount: getPrice(totals.base),
        totalTaxAmount: getPrice(totals.tax),
        totalShippingAmount: getPrice(totals.shipping),
        totalChargeAmount: getPrice(totals.final),
        totalDiscountAmount: getPrice(totals.discount)
      }
    }

    function generateUpdateDataObject (result: ExpressCheckoutUpdateData): AmazonPay.UpdateData {
      const deliveryOptions: AmazonPay.DeliveryOption[] = [];

      for (const option of result.availableShippingMethods) {
        if (
          option.price_incl_tax === undefined || !option.method_title || !option.method_code || !option.carrier_code
        ) {
          continue;
        }

        deliveryOptions.push(
          {
            id: option.method_code,
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

      const totalsData = getTotalsData(result.total);
      totalsData.deliveryOptions = deliveryOptions;

      if (totalsData.deliveryOptions.length === 0) {
        return {
          status: 'error',
          reasonCode: 'shippingAddressInvalid'
        }
      }

      return totalsData;
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

      if (!amazon || !canUseAmazonPay.value) {
        return;
      }

      const scopes: AmazonPay.Scope[] = ['name', 'email', 'phoneNumber', 'billingAddress'];
      let productType: AmazonPay.ProductType = 'PayOnly';

      if (isShippingAddressRequired.value) {
        scopes.push('shippingAddress');
        productType = 'PayAndShip';
      }

      try {
        await amazon.Pay.renderJSButton('._amazon-pay-container', {
          merchantId: config.amazonPay.merchantId,
          ledgerCurrency: DEFAULT_CURRENCY_CODE,
          productType,
          sandbox: config.amazonPay.sandbox,
          placement: 'Cart',
          buttonColor: 'Gold',
          checkoutSessionConfig: {
            storeId: config.amazonPay.storeId,
            scopes,
            paymentDetails: {
              paymentIntent: 'AuthorizeWithCapture',
              canHandlePendingAuthorization: false
            }
          },
          onInitCheckout: async function (event) {
            customerData.clearData();

            if (!isExpressCheckout.value) {
              return getTotalsData(expressCheckoutTotals.value);
            }

            if (!props.onShippingDetailsChanged) {
              throw new Error('onShippingDetailsChanged is not defined');
            }

            emit('payment-started');

            if (event.buyer) {
              customerData.updateCustomer(event.buyer);
            }

            if (event.billingAddress) {
              customerData.updateBillingAddress(event.billingAddress);
            }

            if (event.shippingAddress) {
              customerData.updateShippingAddress(event.shippingAddress);
            }

            return onAddressUpdate(event.shippingAddress);
          },
          onShippingAddressSelection: async function (event) {
            if (!isExpressCheckout.value) {
              return getTotalsData(expressCheckoutTotals.value);
            }

            return onAddressUpdate(event.shippingAddress);
          },
          onDeliveryOptionSelection: async function (event) {
            if (!isExpressCheckout.value) {
              return getTotalsData(expressCheckoutTotals.value);
            }

            if (!props.onShippingDetailsChanged) {
              throw new Error('onShippingDetailsChanged is not defined');
            }

            const result = await props.onShippingDetailsChanged({
              shippingMethod: event.deliveryOptions?.id
            });

            return generateUpdateDataObject(result);
          },
          onCompleteCheckout: async function (event) {
            root.$store.commit(`${MODULE_NAME}/${SET_AMAZON_SESSION_ID}`, event.amazonCheckoutSessionId);

            if (!isExpressCheckout.value) {
              emit('success');
              customerData.clearData();
              return;
            }

            if (!props.onExpressCheckoutAuthorized) {
              throw new Error('onExpressCheckoutAuthorized is not defined');
            }

            const data = customerData.getData();

            try {
              await props.onExpressCheckoutAuthorized({
                paymentMethod: SupportedMethodCodes.AMAZON_PAY,
                customer: data.customer,
                shippingDetails: data.shippingAddressAdditionalData,
                paymentDetails: data.billingAddressAdditionalData
              });

              emit('success');
            } catch (error) {
              Logger.error('Error during payment authorization: ' + error, 'amazon-pay')();
              EventBus.$emit(PAYMENT_ERROR_EVENT);
            } finally {
              customerData.clearData();
            }
          },
          onCancel: function () {
            customerData.clearData();
          },
          onError: function (event) {
            Logger.error('Checkout instance creation error: ' + event.message, 'amazon-pay')();
            // No need to emit PAYMENT_ERROR_EVENT because in this case, the Amazon Pay popup doesn’t close and shows the error inside it.
          }
        });
      } catch (error) {
        Logger.error('Checkout instance creation error: ' + error, 'amazon-pay')();
        EventBus.$emit(PAYMENT_ERROR_EVENT);
      }
    }

    onMounted(() => {
      renderAmazonPayButton();
    });

    const showContainer = ref(true);

    watch([isShippingAddressRequired, canUseAmazonPay], async () => {
      if (!canUseAmazonPay.value) {
        return;
      }

      showContainer.value = false;
      await nextTick();
      showContainer.value = true;
      await nextTick();

      renderAmazonPayButton();
    });

    return {
      canUseAmazonPay,
      showContainer
    }
  }
});
</script>
