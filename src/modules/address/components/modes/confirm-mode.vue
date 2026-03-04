<template>
  <div class="confirm-mode modal-address-validation-mode">
    <SfHeading
      class="sf-heading--left"
      :title="$t('Check Address Format')"
      :level="3"
    />

    <span class="_subtitle">
      {{ $t('We found a standard version of this address that looks slightly different. Please select the one you prefer to use.') }}
    </span>

    <div class="_container">
      <div class="_radio-group">
        <SfRadio
          v-model="selectedAddressType"
          value="entered"
          name="address-selection"
          class="_radio"
        >
          <template #label>
            <div class="_radio-label">
              <span class="_radio-title">{{ $t('Address You Entered') }}</span>

              <AddressCard :address="enteredAddress" />
            </div>
          </template>
        </SfRadio>

        <SfRadio
          v-model="selectedAddressType"
          value="suggested"
          name="address-selection"
          class="_radio"
        >
          <template #label>
            <div class="_radio-label">
              <span class="_radio-title">{{ $t('Suggested Address') }}</span>

              <AddressCard
                :address="suggestedAddress"
                :highlighted-fields="modifiedFields"
              />
            </div>
          </template>
        </SfRadio>
      </div>
    </div>

    <div class="_buttons">
      <SfButton
        class="_button"
        @click="useSelected"
      >
        {{ $t('Use Selected') }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';
import { SfButton, SfRadio, SfHeading } from '@storefront-ui/vue';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import AddressCard from '../address-card.vue';

export default defineComponent({
  name: 'ConfirmMode',
  components: {
    SfButton,
    SfRadio,
    SfHeading,
    AddressCard
  },
  props: {
    enteredAddress: {
      type: Object as PropType<Partial<BaseAddressDetails>>,
      required: true
    },
    suggestedAddress: {
      type: Object as PropType<Partial<BaseAddressDetails>>,
      required: true
    }
  },
  setup (props, { emit }) {
    const selectedAddressType = ref<'entered' | 'suggested'>('suggested');

    const useSelected = () => {
      if (selectedAddressType.value === 'entered') {
        emit('use-entered-address');
      } else {
        emit('use-suggested-address', { address: props.suggestedAddress });
      }
    };

    const modifiedFields = computed<string[]>(() => {
      const entered = props.enteredAddress;
      const suggested = props.suggestedAddress;

      if (!entered || !suggested || Object.keys(entered).length === 0 || Object.keys(suggested).length === 0) {
        return [];
      }

      const fieldsToCompare: (keyof BaseAddressDetails)[] = [
        'streetAddress',
        'apartmentNumber',
        'city',
        'state',
        'zipCode',
        'country'
      ];

      return fieldsToCompare.filter(field => {
        const enteredValue = entered[field];
        const suggestedValue = suggested[field];

        return enteredValue !== suggestedValue;
      });
    });

    return {
      modifiedFields,
      selectedAddressType,
      useSelected
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../css/modal-address-validation-mode.scss";

.confirm-mode {
  ._radio-group {
    display: flex;
    flex-direction: column;
  }

  ._radio {
    --radio-container-padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-xs);

    &:hover {
      --radio-border: 2px solid var(--c-primary-lighten);
    }
  }

  ._radio-label {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  ._radio-title {
    font-weight: var(--font-semibold);
    font-size: var(--font-base);
    margin-bottom: var(--spacer-xs);
    display: block;
  }
}
</style>
