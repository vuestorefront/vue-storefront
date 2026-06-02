<template>
  <div
    class="confirm-add-subpremises-mode modal-address-validation-mode"
    role="alertdialog"
    aria-modal="true"
  >
    <SfHeading
      ref="heading"
      class="sf-heading--left"
      :title="$t('Unit Number Missing?')"
      :level="3"
      tabindex="-1"
    />

    <span class="_subtitle">
      {{ $t("It looks like this building usually requires a unit or apartment number. Please add one if applicable, or continue if you are sure it isn't required.") }}
    </span>

    <div class="_container">
      <div class="_column">
        <SfHeading
          class="sf-heading--left _column-title"
          :title="$t('Suggested Address')"
          :level="4"
        />

        <AddressCard :address="suggestedAddress" />

        <SfInput
          v-model.trim="unitNumber"
          class="_input"
          name="unit-number"
          :label="$t('Apartment, suite, unit, etc.')"
        />
      </div>
    </div>

    <div class="_buttons">
      <SfButton
        class="sf-button--outline _button"
        @click="useEntered"
      >
        {{ $t('No Unit / Use Without Unit') }}
      </SfButton>

      <SfButton
        class="_button"
        :disabled="!canSubmitUpdatedUnit"
        @click="useUpdateAddress"
      >
        {{ $t('Use Updated Address') }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, Ref } from '@vue/composition-api';
import { SfHeading, SfButton, SfInput } from '@storefront-ui/vue';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import AddressCard from '../address-card.vue';

export default defineComponent({
  name: 'ConfirmAddSubpremisesMode',
  components: {
    SfHeading,
    SfButton,
    SfInput,
    AddressCard
  },
  props: {
    suggestedAddress: {
      type: Object as PropType<Partial<BaseAddressDetails>>,
      required: true
    },
    enteredAddress: {
      type: Object as PropType<Partial<BaseAddressDetails>>,
      required: true
    }
  },
  setup (props, { emit }) {
    const unitNumber = ref<string>('');
    const heading: Ref<InstanceType<typeof SfHeading> | null> = ref(null);

    const canSubmitUpdatedUnit = computed<boolean>(() => {
      return !!unitNumber.value && unitNumber.value.trim().length > 0;
    });

    const useEntered = () => {
      emit('use-entered-address');
    };

    const useUpdateAddress = () => {
      const updated: Partial<BaseAddressDetails> = {
        ...props.suggestedAddress,
        apartmentNumber: unitNumber.value
      };

      emit('use-modified-address', { address: updated });
    };

    onMounted(() => {
      if (heading.value === null) {
        return;
      }

      (heading.value.$el as HTMLElement).focus();
    });

    return {
      heading,
      unitNumber,
      canSubmitUpdatedUnit,
      useEntered,
      useUpdateAddress
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../../css/modal-address-validation-mode.scss";
</style>
