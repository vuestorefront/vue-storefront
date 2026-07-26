<template>
  <div class="currency-selector">
    <span
      :id="labelId"
      class="_label"
    >
      {{ $t('Select Currency') }}
    </span>

    <SfSelect
      v-model="selectedCurrency"
      class="_select"
      :label-id="labelId"
    >
      <SfSelectOption
        v-for="currency in availableCurrencies"
        :key="currency.code"
        :value="currency.code"
      >
        {{ currency.code }}

        <span class="_currency-name">
          ({{ currency.name }})
        </span>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>

<script lang="ts">
import { useStore } from '@vue-storefront/core/application-services';
import { defineComponent, computed } from 'vue';
import { SfSelect } from '@storefront-ui/vue';

import { GET_ACTIVE_CURRENCY, GET_AVAILABLE_CURRENCIES } from '../types/getters';
import { MODULE_NAME } from '../types/module-name';
import { UPDATE_ACTIVE_CURRENCY } from '../types/actions';

export default defineComponent({
  name: 'CurrencySelector',
  components: {
    SfSelect
  },
  props: {
    labelId: {
      type: String,
      required: true
    }
  },
  setup () {
    const applicationStore = useStore();
    const selectedCurrency = computed<string>({
      get: () => {
        return applicationStore.getters[`${MODULE_NAME}/${GET_ACTIVE_CURRENCY}`].code;
      },
      set: (value: string) => {
        applicationStore.dispatch(`${MODULE_NAME}/${UPDATE_ACTIVE_CURRENCY}`, value);
      }
    });

    const availableCurrencies = computed(() => {
      return applicationStore.getters[`${MODULE_NAME}/${GET_AVAILABLE_CURRENCIES}`];
    });

    return {
      availableCurrencies,
      selectedCurrency
    }
  }
});
</script>

<style lang="scss" scoped>
.currency-selector {
  --select-selected-padding: 0 var(--spacer-base) 0 0;
  --select-padding: 0;
  --select-margin: 0;

  display: flex;
  align-items: center;

  ._select {
    cursor: pointer;
  }

  ._label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sf-select {
    ::v-deep {
      .sf-select__selected {
        --select-option-font-size: var(--font-xs);

        ._currency-name {
          display: none;
        }
      }

      .sf-select__dropdown {
        min-width: 10rem;
      }

      .sf-select__chevron {
        right: 0;
      }

      .sf-select__error-message {
        display: none;
      }
    }
  }
}
</style>
