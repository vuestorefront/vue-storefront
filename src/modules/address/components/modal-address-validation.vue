<template>
  <div class="modal-address-validation">
    <SfModal
      :visible="isVisible"
      @close="closeModal"
      class="modal-address-validation"
    >
      <fix-mode
        v-if="isFixMode"
        :entered-address="enteredAddress"
        :suggested-address="suggestedAddress"
        :missing-components="missingComponents"
        @close="changeAddress"
        @use-modified-address="useModifiedAddress"
        @use-entered-address="useEnteredAddress"
        class="_address-form"
      />

      <confirm-mode
        v-if="isConfirmMode"
        :entered-address="enteredAddress"
        :suggested-address="suggestedAddress"
        @use-suggested-address="useSuggestedAddress"
        @use-entered-address="useEnteredAddress"
        class="_address-form"
      />

      <confirm-add-subpremises-mode
        v-if="isSubpremisesMode"
        :entered-address="enteredAddress"
        :suggested-address="suggestedAddress"
        @use-modified-address="useModifiedAddress"
        @use-entered-address="useEnteredAddress"
        class="_address-form"
      />

      <div class="_attribution">
        <img
          alt=""
          :src="googleMapsAttributionLogo"
          class="_logo-icon"
        >
      </div>
    </SfModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, SetupContext } from '@vue/composition-api';
import { SfModal, SfHeading } from '@storefront-ui/vue';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import googleMapsAttributionLogo from '../assets/google-maps-logo.svg';
import { AddressSelectedEvent, ADDRESS_VALIDATION_EVENTS } from '../types/address-validation-events';
import { ADDRESS_VALIDATION_MODAL_NAME } from '../types/modal-names';

import ConfirmMode from './modes/confirm-mode.vue';
import ConfirmAddSubpremisesMode from './modes/confirm-add-subpremises-mode.vue';
import FixMode from './modes/fix-mode.vue';

interface ModalData {
  name: string,
  payload?: {
    verdict: 'CONFIRM' | 'FIX' | 'CONFIRM_ADD_SUBPREMISES',
    enteredAddress?: Partial<BaseAddressDetails>,
    suggestedAddress?: Partial<BaseAddressDetails>,
    missingComponents?: string[]
  }
}

export default defineComponent({
  name: 'ModalAddressValidation',
  components: {
    ConfirmMode,
    ConfirmAddSubpremisesMode,
    FixMode,
    SfModal,
    SfHeading
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object as PropType<ModalData>,
      default: () => ({
        name: ADDRESS_VALIDATION_MODAL_NAME
      })
    }
  },
  setup (props, { emit }: SetupContext) {
    const enteredAddress = computed(() => {
      return props.modalData.payload?.enteredAddress || {};
    });

    const suggestedAddress = computed(() => {
      return props.modalData.payload?.suggestedAddress || {};
    });

    const isConfirmMode = computed<boolean>(() => {
      return props.modalData.payload?.verdict === 'CONFIRM';
    });

    const isFixMode = computed<boolean>(() => {
      return props.modalData.payload?.verdict === 'FIX';
    });

    const isSubpremisesMode = computed<boolean>(() => {
      return props.modalData.payload?.verdict === 'CONFIRM_ADD_SUBPREMISES';
    });

    const missingComponents = computed<string[]>(() => {
      return props.modalData.payload?.missingComponents || [];
    })

    const closeModal = () => {
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.MODAL_HIDE, props.modalData.name);
      emit('close', props.modalData.name);
    };

    const changeAddress = () => {
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.CHANGE_ADDRESS);
      closeModal();
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

    const useModifiedAddress = ({ address }: { address: Partial<BaseAddressDetails> }) => {
      const event: AddressSelectedEvent = {
        type: 'modified',
        address
      };
      EventBus.$emit(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, event);

      closeModal();
    };

    return {
      enteredAddress,
      suggestedAddress,
      isConfirmMode,
      isFixMode,
      isSubpremisesMode,
      missingComponents,
      closeModal,
      useEnteredAddress,
      useSuggestedAddress,
      changeAddress,
      useModifiedAddress,
      googleMapsAttributionLogo
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.modal-address-validation {
  --modal-width: auto;
  --modal-content-padding: var(--spacer-base);

  ::v-deep .sf-modal__content {
    display: flex;
    flex-direction: column;
    justify-self: stretch;
    height: 100%;
  }

  ._address-form {
    flex-grow: 1;
  }

  ._attribution {
    margin-top: var(--spacer-sm);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include for-desktop {
    ._attribution {
      justify-content: end;
    }
  }
}
</style>
