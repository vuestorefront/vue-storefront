<template>
  <div
    class="fix-mode modal-address-validation-mode"
    role="alertdialog"
    aria-modal="true"
  >
    <SfHeading
      class="sf-heading--left"
      :title="modalTitle"
      :level="3"
      tabindex="-1"
      ref="heading"
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
            :address="enteredAddress"
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
import { useI18n } from '@vue-storefront/core/application-services';
import { defineComponent, computed, PropType, ref, Ref, onMounted } from 'vue';
import { SfHeading, SfButton, SfInput } from '@storefront-ui/vue';

import AddressValidationDetails from '../../types/address-validation-details.interface';

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
      type: Object as PropType<AddressValidationDetails>,
      required: true
    },
    suggestedAddress: {
      type: Object as PropType<AddressValidationDetails>,
      required: true
    },
    missingComponents: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const applicationI18n = useI18n();
    const localStreetNumber = ref<string>('');
    const heading: Ref<InstanceType<typeof SfHeading> | null> = ref(null);

    const isMissingStreetNumber = computed<boolean>(() => {
      return props.missingComponents.includes('street_number');
    });

    const canSubmitUpdatedStreetNumber = computed<boolean>(() => {
      return !!localStreetNumber.value && localStreetNumber.value.trim().length > 0;
    });

    const useUpdatedAddress = () => {
      const currentStreetAddress = props.enteredAddress.streetAddress || '';
      const updatedStreetAddress = `${localStreetNumber.value} ${currentStreetAddress}`.trim();

      const updated: AddressValidationDetails = {
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
        return applicationI18n.t('Use Without Street Number').toString();
      }

      return applicationI18n.t('Use Entered').toString();
    });

    const addressHeading = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return applicationI18n.t('Suggested Address').toString();
      }

      return applicationI18n.t('Entered Address').toString();
    });

    const modalTitle = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return applicationI18n.t('Street Number Missing?').toString();
      }

      return applicationI18n.t('Review Address').toString();
    });

    const modalSubtitle = computed<string>(() => {
      if (isMissingStreetNumber.value) {
        return applicationI18n.t('We could not find a street number in this address. Please add one if your address uses them (e.g., 123 Main St), or continue if it is correct.').toString();
      }

      return applicationI18n.t('We were not able to confirm this address. Please review it carefully, or you can continue if you are confident it is correct.').toString();
    });

    onMounted(() => {
      if (heading.value === null) {
        return;
      }

      (heading.value.$el as HTMLElement).focus()
    });

    return {
      addressHeading,
      canSubmitUpdatedStreetNumber,
      heading,
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
