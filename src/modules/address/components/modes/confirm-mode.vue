<template>
  <div
    class="confirm-mode modal-address-validation-mode"
    role="alertdialog"
    aria-modal="true"
  >
    <SfHeading
      ref="heading"
      class="sf-heading--left"
      :title="$t('Check Address Format')"
      :level="3"
      tabindex="-1"
    />

    <span class="_subtitle">
      {{ $t('We found a standard version of this address that looks slightly different. Please select the one you prefer to use.') }}
    </span>

    <div class="_container">
      <div class="_radio-group">
        <SfRadio
          :selected="selectedAddressType"
          value="entered"
          name="address-selection"
          class="_radio"
          @input="onSelectedAddressInput"
        >
          <template #label>
            <div class="_radio-label">
              <span class="_radio-title">{{ $t('Address You Entered') }}</span>

              <AddressCard :address="enteredAddress" />
            </div>
          </template>
        </SfRadio>

        <SfRadio
          :selected="selectedAddressType"
          value="suggested"
          name="address-selection"
          class="_radio"
          @input="onSelectedAddressInput"
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
import { computed, defineComponent, onMounted, PropType, ref, Ref } from 'vue';
import { SfButton, SfRadio, SfHeading } from '@storefront-ui/vue';

import AddressValidationDetails from '../../types/address-validation-details.interface';

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
      type: Object as PropType<AddressValidationDetails>,
      required: true
    },
    suggestedAddress: {
      type: Object as PropType<AddressValidationDetails>,
      required: true
    }
  },
  setup (props, { emit }) {
    const selectedAddressType = ref<'entered' | 'suggested'>('suggested');
    const heading: Ref<InstanceType<typeof SfHeading> | null> = ref(null);

    const onSelectedAddressInput = (value: 'entered' | 'suggested'): void => {
      selectedAddressType.value = value;
    };

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

      const fieldsToCompare: (keyof AddressValidationDetails)[] = [
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

    onMounted(() => {
      if (heading.value === null) {
        return;
      }

      (heading.value.$el as HTMLElement).focus();
    });

    return {
      heading,
      modifiedFields,
      onSelectedAddressInput,
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
