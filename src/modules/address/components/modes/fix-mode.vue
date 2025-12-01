<template>
  <div class="fix-mode modal-address-validation-mode">
    <SfHeading
      class="sf-heading--left"
      :title="modalTitle"
      :level="3"
    />

    <span class="_subtitle">
      {{ modalSubtitle }}
    </span>

    <div class="_container">
      <div class="_column">
        <SfHeading
          class="sf-heading--left _column-title"
          :title="addressHeading"
          :level="4"
        />

        <template v-if="isMissingStreetNumber">
          <AddressCard
            :address="suggestedAddress"
          />

          <SfInput
            v-model.trim="localStreetNumber"
            class="_input"
            name="street-number"
            :label="$t('Street Number')"
          />
        </template>

        <AddressCard :address="enteredAddress" v-else />
      </div>
    </div>

    <div class="_buttons">
      <SfButton
        class="sf-button--outline _button"
        @click="useEntered"
      >
        {{ useEnteredButtonText }}
      </SfButton>

      <SfButton
        class="_button"
        :disabled="!canSubmitUpdatedStreetNumber"
        @click="useUpdatedAddress"
        v-if="isMissingStreetNumber"
      >
        {{ $t('Use Updated Address') }}
      </SfButton>

      <SfButton
        class="_button"
        @click="changeAddress"
        v-else
      >
        {{ $t('Change Address') }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from '@vue/composition-api';
import { SfHeading, SfButton, SfInput } from '@storefront-ui/vue';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import AddressCard from '../address-card.vue';

export default defineComponent({
  name: 'FixMode',
  components: {
    SfHeading,
    SfButton,
    SfInput,
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
    },
    missingComponents: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup (props, { emit, root }) {
    const localStreetNumber = ref<string>('');

    const isMissingStreetNumber = computed<boolean>(() => {
      return props.missingComponents.includes('street_number');
    });

    const canSubmitUpdatedStreetNumber = computed<boolean>(() => {
      return !!localStreetNumber.value && localStreetNumber.value.trim().length > 0;
    });

    const useUpdatedAddress = () => {
      const currentStreetAddress = props.enteredAddress.streetAddress || '';
      const updatedStreetAddress = `${localStreetNumber.value} ${currentStreetAddress}`.trim();

      const updated: Partial<BaseAddressDetails> = {
        ...props.enteredAddress,
        streetAddress: updatedStreetAddress
      };

      emit('use-modified-address', { address: updated });
    };

    const changeAddress = () => {
      emit('close');
    };

    const useEntered = () => {
      emit('use-entered-address');
    };

    const useEnteredButtonText = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return root.$t('Use Without Street Number').toString();
      }

      return root.$t('Use Entered').toString();
    });

    const addressHeading = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return root.$t('Suggested Address').toString();
      }

      return root.$t('Entered Address').toString();
    });

    const modalTitle = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return root.$t('Street Number Required').toString();
      }

      return root.$t('Address Could Not Be Validated').toString();
    });

    const modalSubtitle = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return root.$t('Please provide the street number to complete validation.').toString();
      }

      return root.$t('The address you entered could not be validated. Please review and correct it.').toString();
    });

    return {
      addressHeading,
      canSubmitUpdatedStreetNumber,
      isMissingStreetNumber,
      localStreetNumber,
      modalSubtitle,
      modalTitle,
      useEnteredButtonText,
      useEntered,
      useUpdatedAddress,
      changeAddress
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../css/modal-address-validation-mode.scss";

</style>
