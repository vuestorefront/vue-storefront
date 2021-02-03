/* istanbul ignore file */
import {
  UseCheckout,
  sharedRef,
  Context,
  generateContext
} from '@vue-storefront/core';
import { ref, Ref, computed } from '@vue/composition-api';
import {
  ShippingMethodType,
  PaymentMethodType,
  InputShipmentType,
  InputPaymentType
} from '@vue-storefront/virtocommerce-api';
import { User } from '../types';
import useCart from '../useCart';
import { toUnicode } from 'punycode';
import { close } from 'fs';

const useCheckoutFactory = (factoryParams) => {
  const useCheckout = () => {
    const context = generateContext({
      provide() {
        return useCart();
      }
    });
    const cartFields = useCart();
    

    const paymentMethods: Ref<PaymentMethodType[]> = ref([]);
    const shippingMethods: Ref<ShippingMethodType[]> = ref([]);
    const personalDetails: Ref<User> = ref({});
    const shippingDetails: Ref<any> = ref({ contactInfo: {} });
    const billingDetails: Ref<any> = ref({ contactInfo: {} });
    const chosenPaymentMethod: Ref<PaymentMethodType> = ref({});
    const chosenShippingMethod: Ref<ShippingMethodType> = ref({});

    const initialDetails = { contactInfo: {} };

    const isPersonalDetailsCompleted: Ref<boolean> = ref(false);
    const isShippingAddressCompleted: Ref<boolean> = ref(false);
    const isBillingAddressCompleted: Ref<boolean> = ref(false);
    const isShippingMethodCompleted: Ref<boolean> = computed(
      () => Object.keys(chosenShippingMethod.value).length > 0
    );

    const loading = sharedRef(
      {
        personalDetails: false,
        paymentMethods: false,
        shippingMethods: false,
        shippingAddress: false,
        billingAddress: false,
        shippingMethod: false,
        order: false
      },
      'useCheckout-loading'
    );

    const setPaymentMethod = async (paymentMethod, options: any = {}) => {
      chosenPaymentMethod.value = paymentMethod;

      if (!options.save) {
        return;
      }

      const inputPayment: InputPaymentType = {
        id: cartFields.cart.value.payments[0]?.id,
        paymentGatewayCode: chosenPaymentMethod.value.code,
        billingAddress: {
          phone: billingDetails.value.contactInfo.phoneNumber,
          line1: billingDetails.value.streetName,
          city: billingDetails.value.city,
          countryCode: billingDetails.value.country,
          countryName: billingDetails.value.country,
          regionName: billingDetails.value.state,
          firstName: billingDetails.value.firstName,
          lastName: billingDetails.value.lastName,
          line2: billingDetails.value.streetNumber,
          postalCode: billingDetails.value.postalCode
        }
      };
    
      await context.$vc.api.addOrUpdateCartPayment(
        cartFields.cart.value,
        inputPayment
      );
      const cart = await context.$vc.api.getCart();
      context.setCart(cart);
    };

    const setShippingMethod = async (shippingMethod, options: any = {}) => {
      chosenShippingMethod.value = shippingMethod;
      if (!options.save) {
        return;
      }

      const inputShipment: InputShipmentType = {
        id: cartFields.cart.value.shipments[0]?.id,
        shipmentMethodCode: chosenShippingMethod.value.code,
        shipmentMethodOption: chosenShippingMethod.value.optionName,
        deliveryAddress: {
          phone: shippingDetails.value.contactInfo.phoneNumber,
          line1: shippingDetails.value.streetName,
          city: shippingDetails.value.city,
          countryCode: shippingDetails.value.country,
          countryName: shippingDetails.value.country,
          regionName: shippingDetails.value.state,
          firstName: shippingDetails.value.firstName,
          lastName: shippingDetails.value.lastName,
          line2: shippingDetails.value.streetNumber,
          postalCode: shippingDetails.value.postalCode
        }
      };
      await context.$vc.api.addOrUpdateCartShipment(cartFields.cart.value, inputShipment);
      const cart = await context.$vc.api.getCart();
      context.setCart(cart);
    };

    const setShippingDetails = async (data, options: any = {}) => {
      shippingDetails.value = {
        ...shippingDetails.value,
        ...data,
        contactInfo: {
          ...shippingDetails.value.contactInfo,
          ...data.contactInfo
        }
      };

      isShippingAddressCompleted.value = Boolean(true);
    };

    const setBillingDetails = async (data, options: any = {}) => {
      billingDetails.value = {
        ...billingDetails.value,
        ...data,
        contactInfo: {
          ...billingDetails.value.contactInfo,
          ...data.contactInfo
        }
      };

      isBillingAddressCompleted.value = Boolean(true);
    };

    const loadShippingMethods = async () => {
      if (!isShippingAddressCompleted.value) return;
      loading.value.shippingMethods = true;
      try {
        shippingMethods.value = { ...cartFields.cart.value.availableShippingMethods };
      } finally {
        loading.value.shippingMethods = false;
      }
    };
    const loadPaymentMethods = async () => {
      loading.value.paymentMethods = true;
      try {
        paymentMethods.value = cartFields.cart.value.availablePaymentMethods.map(
          (x) => ({ ...x, label: x.name, value: x.code })
        );

      } finally {
        loading.value.paymentMethods = false;
      }
    };
    const loadDetails = async () => {};
    const setPersonalDetails = async () => {};
    const clean = async () => {
      context.setCart(null);
    };

    const placeOrder = async () => {
      return await context.$vc.api.placeOrder(cartFields.cart.value);
    };

    return {
      loading: computed(() => loading.value),
      billingDetails: computed(() => billingDetails.value),
      shippingMethods: computed(() => shippingMethods.value),
      personalDetails: computed(() => personalDetails.value),
      shippingDetails: computed(() => shippingDetails.value),
      chosenShippingMethod: computed(() => chosenShippingMethod.value),
      chosenPaymentMethod: computed(() => chosenPaymentMethod.value),
      paymentMethods: computed(() => paymentMethods.value),
      isPersonalDetailsCompleted: computed(
        () => isPersonalDetailsCompleted.value
      ),
      isShippingAddressCompleted: computed(
        () => isShippingAddressCompleted.value
      ),
      isBillingAddressCompleted: computed(
        () => isBillingAddressCompleted.value
      ),
      isShippingMethodCompleted: computed(
        () => Object.keys(chosenShippingMethod.value).length > 0
      ),
      setShippingDetails,
      setBillingDetails,
      loadShippingMethods,
      loadPaymentMethods,
      setShippingMethod,
      setPersonalDetails,
      setPaymentMethod,
      placeOrder,
      loadDetails,
      clean
    };
  };

  return useCheckout;
};

export default useCheckoutFactory({});
