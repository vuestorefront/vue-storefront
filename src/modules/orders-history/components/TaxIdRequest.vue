<template>
  <div class="tax-id-request">
    <div v-if="error" class="_error-container">
      <p class="_error-message">
        {{ $t('Order not found') }}
      </p>

      <router-link
        :to="{ name: 'orders-history' }"
        class="sf-button"
      >
        {{ $t('Go To Order History') }}
      </router-link>
    </div>

    <div v-else-if="isLoading" class="_loading">
      {{ $t('Loading...') }}
    </div>

    <div v-else class="_form-container">
      <SfHeading
        :title="$t('Tax ID Required for Order #{orderNumber}', { orderNumber })"
        class="_heading"
      />

      <p class="_subtitle">
        {{ $t('To ensure your package clears customs without delay, the destination country requires your Tax ID for delivery.') }}
      </p>

      <validation-observer
        ref="validationObserver"
        v-slot="{ passes }"
        slim
      >
        <form @submit.prevent="passes(onSubmit)" class="_form">
          <validation-provider
            v-slot="{ errors }"
            rules="required|max:64"
            slim
            name="Tax ID"
          >
            <SfInput
              v-model="taxIdValue"
              class="_input"
              :label="$t('Tax ID')"
              :disabled="isSubmitting"
              :valid="!errors.length"
              :error-message="errors[0]"
            />
          </validation-provider>

          <div v-if="hasDefaultShippingAddress" class="_checkbox-container">
            <SfCheckbox
              v-model="shouldSaveToDefaultAddress"
              :label="$t('Save this Tax ID to my default shipping address')"
              :disabled="isSubmitting"
            />
          </div>

          <div class="_button-container">
            <SfButton
              type="submit"
              :disabled="isSubmitting"
              class="_submit-button"
            >
              {{ isSubmitting ? $t('Submitting...') : $t('Submit Tax ID') }}
            </SfButton>
          </div>

          <div v-if="submitError" class="_submit-error">
            {{ submitError }}
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeMount } from '@vue/composition-api';
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, max } from 'vee-validate/dist/rules';
import { SfButton, SfCheckbox, SfHeading, SfInput } from '@storefront-ui/vue';

import i18n from '@vue-storefront/i18n';

import { usePersistedVatId } from 'src/modules/persisted-customer-data';

import { STORE_NAME } from '../store/store-name';
import { FETCH_ORDER_DETAILS, SUBMIT_TAX_ID_UPDATE_REQUEST } from '../types/store/actions';
import { Order } from '../types/order';

extend('required', {
  ...required,
  message: 'Field is required'
});

extend('max', max);

export default defineComponent({
  name: 'TaxIdRequest',
  components: {
    SfButton,
    SfCheckbox,
    SfHeading,
    SfInput,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  setup (props, { root }) {
    const taxIdValue = ref('');
    const shouldSaveToDefaultAddress = ref(false);
    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const error = ref(false);
    const submitError = ref('');
    const order = ref<Order | null>(null);

    const orderNumber = computed(() => {
      return ((order as any).value as (Order | null))?.increment_id || '';
    });

    const defaultShippingAddress = computed(() => {
      const user = root.$store.state.user?.current;
      const addresses = user?.addresses || [];
      return addresses.find((address: any) => !!address.default_shipping);
    });

    const hasDefaultShippingAddress = computed(() => {
      return !!defaultShippingAddress.value;
    });

    const { persistLastUsedCustomerVatId } = usePersistedVatId(taxIdValue);

    async function fetchOrderDetails () {
      try {
        const result = await root.$store.dispatch(
          `${STORE_NAME}/${FETCH_ORDER_DETAILS}`,
          { orderId: props.orderId }
        );
        ((order as any).value as (Order | null)) = result;
        error.value = false;
      } catch (e) {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    }

    async function updateDefaultAddress () {
      if (!defaultShippingAddress.value) {
        return;
      }

      const addressToUpdate = {
        id: defaultShippingAddress.value.id,
        firstname: defaultShippingAddress.value.firstname,
        lastname: defaultShippingAddress.value.lastname,
        street: defaultShippingAddress.value.street,
        city: defaultShippingAddress.value.city,
        region: defaultShippingAddress.value.region,
        postcode: defaultShippingAddress.value.postcode,
        country_id: defaultShippingAddress.value.country_id,
        telephone: defaultShippingAddress.value.telephone,
        default_shipping: true,
        default_billing: defaultShippingAddress.value.default_billing,
        customer_id: defaultShippingAddress.value.customer_id,
        vat_id: defaultShippingAddress.value.vat_id,
        tax_id: taxIdValue.value
      };

      await root.$store.dispatch('budsies/updateAddress', { address: addressToUpdate });
    }

    async function onSubmit () {
      submitError.value = '';
      isSubmitting.value = true;

      try {
        await root.$store.dispatch(
          `${STORE_NAME}/${SUBMIT_TAX_ID_UPDATE_REQUEST}`,
          { orderId: props.orderId, taxId: taxIdValue.value }
        );

        if (shouldSaveToDefaultAddress.value && hasDefaultShippingAddress.value) {
          await updateDefaultAddress();
        }

        persistLastUsedCustomerVatId(taxIdValue.value);

        root.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('Tax ID saved successfully'),
          action1: { label: i18n.t('OK') }
        });

        root.$router.push({ name: 'orders-history' });
      } catch (e) {
        const errorMessage = (e as Error).message || String(i18n.t('Failed to submit Tax ID'));
        submitError.value = errorMessage;

        root.$store.dispatch('notification/spawnNotification', {
          type: 'danger',
          message: errorMessage,
          action1: { label: i18n.t('OK') }
        });
      } finally {
        isSubmitting.value = false;
      }
    }

    onBeforeMount(() => {
      fetchOrderDetails();
    });

    return {
      taxIdValue,
      shouldSaveToDefaultAddress,
      isLoading,
      isSubmitting,
      error,
      submitError,
      orderNumber,
      hasDefaultShippingAddress,
      onSubmit
    };
  }
});
</script>

<style lang="scss" scoped>
.tax-id-request {
  max-width: 1272px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacer-xl);
  box-sizing: border-box;

  ._error-container {
    text-align: center;
    padding: var(--spacer-xl);

    ._error-message {
      font-size: var(--font-size--lg);
      margin-bottom: var(--spacer-lg);
      color: var(--c-danger);
    }
  }

  ._loading {
    text-align: center;
    padding: var(--spacer-xl);
    font-size: var(--font-size--lg);
  }

  ._form-container {
    ._heading {
      font-size: var(--font-size--xl);
      font-weight: var(--font-weight--bold);
      margin-bottom: var(--spacer-md);
      color: var(--c-text);
    }

    ._subtitle {
      font-size: var(--font-size--base);
      line-height: 1.6;
      margin-bottom: var(--spacer-xl);
      color: var(--c-text-muted);
      text-align: center;
    }

    ._form {
      max-width: 32rem;
      margin: 0 auto;

      ._button-container {
        margin-top: var(--spacer-base);
      }

      ._submit-button {
        width: 100%;
      }

      ._submit-error {
        margin-top: var(--spacer-md);
        color: var(--c-danger);
        font-size: var(--font-size--sm);
      }

      ._submit-success {
        margin-top: var(--spacer-md);
        color: var(--c-success);
        font-size: var(--font-size--sm);
      }
    }
  }
}
</style>
