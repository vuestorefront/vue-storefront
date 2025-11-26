<template>
  <div class="modal-address-validation">
    <SfModal :visible="isVisible" @close="closeModal" class="modal-address-validation">
      <SfHeading
        class="sf-heading--left"
        :title="getModalTitle"
        :level="3"
      />

      <span class="_subtitle">
        {{ getModalSubtitle }}
      </span>

      <div class="_container">
        <div v-if="!isSubpremisesMode && !isConfirmMode" class="_column">
          <SfHeading
            class="sf-heading--left _column-title"
            :title="$t('Address You Entered')"
            :level="4"
          />

          <AddressCard
            :address="enteredAddress"
          />

          <SfInput
            v-if="isMissingStreetNumber"
            v-model.trim="streetNumber"
            class="_street-number-input"
            name="street-number"
            :placeholder="$t('Street Number')"
          />
        </div>

        <div v-if="!isFixMode && !isSubpremisesMode && !isConfirmMode" class="_column">
          <SfHeading
            class="sf-heading--left _column-title"
            :title="$t('Suggested Address')"
            :level="4"
          />

          <AddressCard
            :address="suggestedAddress"
          />
        </div>

        <div v-if="isConfirmMode" class="_radio-group">
          <SfRadio
            v-model="selectedAddressType"
            value="entered"
            name="address-selection"
            class="_radio"
          >
            <template #label>
              <div class="_radio-label">
                <span class="_radio-title">{{ $t('Address You Entered') }}</span>

                <AddressCard
                  :address="enteredAddress"
                />
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
                />
              </div>
            </template>
          </SfRadio>
        </div>

        <div v-if="isSubpremisesMode" class="_column">
          <SfHeading
            class="sf-heading--left _column-title"
            :title="$t('Suggested Address')"
            :level="4"
          />

          <AddressCard
            :address="suggestedAddress"
          />

          <SfInput
            v-model.trim="unitNumber"
            class="_unit-input"
            name="unit-number"
            :label="$t('Apartment, suite, unit, etc.')"
          />
        </div>
      </div>

      <div class="_buttons">
        <SfButton
          v-if="isConfirmMode"
          class="_button"
          @click="useSelectedAddress"
        >
          {{ $t('Use Selected') }}
        </SfButton>

        <SfButton
          v-if="isFixMode && !isMissingStreetNumber"
          class="sf-button--outline _button"
          @click="useEnteredAddress"
        >
          {{ $t('Use Entered Address') }}
        </SfButton>

        <SfButton
          v-if="isFixMode && !isMissingStreetNumber"
          class="_button"
          @click="changeAddress"
        >
          {{ $t('Change Address') }}
        </SfButton>

        <SfButton
          v-if="isFixMode && isMissingStreetNumber"
          class="sf-button--outline _button"
          @click="useEnteredAddress"
        >
          {{ $t('Use Without Street Number') }}
        </SfButton>

        <SfButton
          v-if="isFixMode && isMissingStreetNumber"
          class="_button"
          :disabled="!streetNumber"
          @click="useAddressWithStreetNumber"
        >
          {{ $t('Use Updated Address') }}
        </SfButton>

        <SfButton
          v-if="isSubpremisesMode"
          class="sf-button--outline _button"
          @click="useWithoutUnit"
        >
          {{ $t('No Unit / Use Without Unit') }}
        </SfButton>

        <SfButton
          v-if="isSubpremisesMode"
          class="_button"
          :disabled="!unitNumber"
          @click="useUpdatedAddress"
        >
          {{ $t('Use Updated Address') }}
        </SfButton>
      </div>
    </SfModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, SetupContext } from '@vue/composition-api';
import { SfModal, SfHeading, SfButton, SfInput, SfRadio } from '@storefront-ui/vue';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import { AddressSelectedEvent, ADDRESS_VALIDATION_EVENTS } from '../types/address-validation-events';
import AddressCard from './address-card.vue';

interface ModalData {
  name: string,
  payload?: {
    verdict: 'CONFIRM' | 'FIX' | 'CONFIRM_ADD_SUBPREMISES',
    enteredAddress?: Partial<BaseAddressDetails>,
    suggestedAddress?: Partial<BaseAddressDetails>,
    missingComponents?: string[]
  }
}

export const MODAL_NAME = 'modal-address-validation';

export default defineComponent({
  name: 'ModalAddressValidation',
  components: {
    AddressCard,
    SfModal,
    SfHeading,
    SfButton,
    SfInput,
    SfRadio
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object as PropType<ModalData>,
      required: true
    }
  },
  setup (props, { emit, root }: SetupContext) {
    const unitNumber = ref('');
    const streetNumber = ref('');
    const selectedAddressType = ref<'entered' | 'suggested'>('suggested');

    const enteredAddress = computed(() => {
      return props.modalData?.payload?.enteredAddress || {};
    });

    const suggestedAddress = computed(() => {
      return props.modalData?.payload?.suggestedAddress || {};
    });

    const isConfirmMode = computed<boolean>(() => {
      return props.modalData?.payload?.verdict === 'CONFIRM';
    });

    const isFixMode = computed<boolean>(() => {
      return props.modalData?.payload?.verdict === 'FIX';
    });

    const isSubpremisesMode = computed<boolean>(() => {
      return props.modalData?.payload?.verdict === 'CONFIRM_ADD_SUBPREMISES';
    });

    const isMissingStreetNumber = computed<boolean>(() => {
      const missingComponents = props.modalData?.payload?.missingComponents || [];
      return props.modalData?.payload?.verdict === 'FIX' &&
             missingComponents.includes('street_number');
    });

    const getModalTitle = computed<string>(() => {
      if (isFixMode.value) {
        if (isMissingStreetNumber.value) {
          return root.$t('Street Number Required').toString();
        }
        return root.$t('Address Could Not Be Validated').toString();
      }

      if (isSubpremisesMode.value) {
        return root.$t('Please Provide Unit Number').toString();
      }

      return root.$t('Confirm Shipping Address').toString();
    });

    const getModalSubtitle = computed<string>(() => {
      if (isFixMode.value) {
        if (isMissingStreetNumber.value) {
          return root.$t('Please provide the street number to complete validation.').toString();
        }
        return root.$t('The address you entered could not be validated. Please review and correct it.').toString();
      }

      if (isSubpremisesMode.value) {
        return root.$t('We found your address but need the unit or apartment number to ensure accurate delivery.').toString();
      }

      return root.$t('We found a suggested address that may be more accurate. Please select which address to use.').toString();
    });

    const closeModal = () => {
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.MODAL_HIDE, props.modalData.name);
      emit('close', props.modalData.name);
      unitNumber.value = '';
      streetNumber.value = '';
      selectedAddressType.value = 'suggested';
    };

    const useEnteredAddress = () => {
      const event: AddressSelectedEvent = {
        type: 'entered',
        address: enteredAddress.value
      };
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, event);

      closeModal();
    };

    const useSuggestedAddress = () => {
      const event: AddressSelectedEvent = {
        type: 'suggested',
        address: suggestedAddress.value
      };
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, event);
      closeModal();
    };

    const useSelectedAddress = () => {
      if (selectedAddressType.value === 'entered') {
        useEnteredAddress();
      } else {
        useSuggestedAddress();
      }
    };

    const changeAddress = () => {
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.CHANGE_ADDRESS);
      closeModal();
    };

    const useWithoutUnit = () => {
      const event: AddressSelectedEvent = {
        type: 'entered',
        address: enteredAddress.value
      };
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, event);

      closeModal();
    };

    const useUpdatedAddress = () => {
      const addressWithUnit = {
        ...suggestedAddress.value,
        apartmentNumber: unitNumber.value
      };

      const event: AddressSelectedEvent = {
        type: 'with-unit',
        address: addressWithUnit
      };
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, event);

      closeModal();
    };

    const useAddressWithStreetNumber = () => {
      const currentStreetAddress = enteredAddress.value.streetAddress || '';
      const updatedStreetAddress = `${streetNumber.value} ${currentStreetAddress}`.trim();

      const event: AddressSelectedEvent = {
        type: 'with-street-number',
        address: {
          ...enteredAddress.value,
          streetAddress: updatedStreetAddress
        }
      };
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, event);

      closeModal();
    };

    return {
      unitNumber,
      streetNumber,
      selectedAddressType,
      enteredAddress,
      suggestedAddress,
      isConfirmMode,
      isFixMode,
      isSubpremisesMode,
      isMissingStreetNumber,
      getModalTitle,
      getModalSubtitle,
      closeModal,
      useSelectedAddress,
      useEnteredAddress,
      useSuggestedAddress,
      changeAddress,
      useWithoutUnit,
      useUpdatedAddress,
      useAddressWithStreetNumber
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.modal-address-validation {
  --modal-width: auto;

  ._subtitle {
    display: block;
    margin: var(--spacer-xs) 0 0 0;
    line-height: 1.4;
    font-size: var(--font-sm);
  }

  ._container {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-xl);
    margin: var(--spacer-xl) 0;
  }

  ._column {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  ._column-title {
    --heading-title-font-size: var(--font-base);
    --heading-title-font-weight: var(--font-semibold);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
    --heading-padding: 0;
  }

  ._buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-sm);
    margin-top: var(--spacer-xl);

    @include for-desktop {
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--spacer-base);
    }
  }

  ._button {
    @include for-mobile {
      width: 100%;
    }
  }

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

  ._unit-input {
    margin: var(--spacer-base) 0 0;
  }

  ._street-number-input {
    margin: var(--spacer-base) 0 0;
  }
}
</style>
