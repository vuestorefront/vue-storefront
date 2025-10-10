<template>
  <div class="payment-amazon-pay">
    <div class="_amazon-pay-container" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from '@vue/composition-api'
import config from 'config';

import { ExpressCheckoutData, getFirstAndLastFromFullName, getRegionIdByCountryAndStateCode } from 'src/modules/shared'

import { MODULE_NAME } from '../types/module-name';
import { SET_AMAZON_SESSION_ID } from '../types/mutations';
import { SupportedMethodCodes } from '../types/supported-method-codes';

type AdditionalAddressData = ExpressCheckoutData.AdditionalAddressData;
type ExpressCheckoutAuthorizedCallbackData = ExpressCheckoutData.ExpressCheckoutAuthorizedCallbackData<SupportedMethodCodes>;
type ExpressCheckoutUpdateData = ExpressCheckoutData.ExpressCheckoutUpdateData;
type MainAddressData = ExpressCheckoutData.MainAddressData;
type ShippingDetailsChangedCallbackData = ExpressCheckoutData.ShippingDetailsChangedCallbackData

interface Price {
  amount: string,
  currencyCode: string
}

function getPrice (value: number): Price {
  return {
    amount: value.toString(10),
    currencyCode: 'USD'
  }
}

// TODO: move to a separate d.ts file for amazon pay JS script
interface DeliveryOption {
  id: string,
  price: Price,
  shippingMethod: {
    shippingMethodName: string,
    shippingMethodCode: string
  },
  isDefault: boolean
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

interface AddressSelectionEvent {
  shippingAddress?: Address,
  billingAddress?: Address,
  buyer?: Buyer
}

interface ShippingMethodSelectionEvent {
  deliveryOptions?: {
    id: string,
    displayName: string,
    amount: string
  }
}

interface CompleteCheckoutEvent {
  amazonCheckoutSessionId: string
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

  function updateCustomer (buyer: Buyer) {
    const { firstName, lastName } = getFirstAndLastFromFullName(buyer.name);

    customer.emailAddress = buyer.email;
    customer.firstName = firstName;
    customer.lastName = lastName;
  }

  function updateBillingAddress (billingAddress: Address) {
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

  function updateShippingAddress (shippingAddress: Address) {
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
    }
  },
  setup (props, { emit, root }) {
    const isShippingAddressRequired = computed<boolean>(() => {
      return root.$store.getters['cart/isVirtualCart'];
    });

    const customerData = useCustomerData();

    function generateUpdateDataObject (result: ExpressCheckoutUpdateData): UpdateData {
      const deliveryOptions: DeliveryOption[] = [];

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
              currencyCode: 'USD'
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

    async function onShippingMethodUpdate (shippingMethod: ShippingMethodSelectionEvent['deliveryOptions']): Promise<UpdateData> {
      if (!props.onShippingDetailsChanged) {
        throw new Error('onShippingDetailsChanged is not defined');
      }

      const result = await props.onShippingDetailsChanged({
        shippingMethod: shippingMethod?.id
      });

      return generateUpdateDataObject(result);
    }

    async function onAddressUpdate (shippingAddress?: Address): Promise<UpdateData> {
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
      const amazon = (window as any).amazon;

      if (!amazon) {
        return;
      }

      const scopes: ('name' | 'email' | 'phoneNumber' | 'billingAddress' | 'shippingAddress')[] = ['name', 'email', 'phoneNumber', 'billingAddress'];
      let productType: 'PayAndShip' | 'PayOnly' = 'PayOnly';

      if (isShippingAddressRequired) {
        scopes.push('shippingAddress');
        productType = 'PayAndShip';
      }

      try {
        await amazon.Pay.renderJSButton('._amazon-pay-container', {
          merchantId: config.amazonPay.merchantId,
          ledgerCurrency: 'USD',
          productType,
          sandbox: true,
          placement: 'Cart',
          buttonColor: 'Gold',
          // TODO: replace with actual total
          estimatedOrderAmount: { 'amount': '109.99', 'currencyCode': 'USD' },
          checkoutSessionConfig: {
            storeId: config.amazonPay.storeId,
            scopes,
            paymentDetails: {
              // paymentIntent: 'AuthorizeWithCapture'
              paymentIntent: 'Authorize',
              canHandlePendingAuthorization: false
            }
          },
          onInitCheckout: async function (event: AddressSelectionEvent): Promise<UpdateData> {
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
          onShippingAddressSelection: function (event: AddressSelectionEvent) {
            return onAddressUpdate(event.shippingAddress);
          },
          onDeliveryOptionSelection: async function (event: ShippingMethodSelectionEvent): Promise<UpdateData> {
            return onShippingMethodUpdate(event.deliveryOptions);
          },
          onCompleteCheckout: async function (event: CompleteCheckoutEvent) {
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
