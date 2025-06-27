<template>
  <div class="currency-selector">
    <SfSelect
      v-model="selectedCurrency"
      class="_select"
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
import { defineComponent, computed } from '@vue/composition-api';
import { SfSelect } from '@storefront-ui/vue';

import { GET_ACTIVE_CURRENCY, GET_AVAILABLE_CURRENCIES } from '../types/getters';
import { MODULE_NAME } from '../types/module-name';
import { UPDATE_ACTIVE_CURRENCY } from '../types/actions';

export default defineComponent({
  name: 'CurrencySelector',
  components: {
    SfSelect
  },
  setup (_, { root }) {
    const selectedCurrency = computed<string>({
      get: () => {
        return root.$store.getters[`${MODULE_NAME}/${GET_ACTIVE_CURRENCY}`].code;
      },
      set: (value: string) => {
        root.$store.dispatch(`${MODULE_NAME}/${UPDATE_ACTIVE_CURRENCY}`, value);
      }
    });

    const availableCurrencies = computed(() => {
      return root.$store.getters[`${MODULE_NAME}/${GET_AVAILABLE_CURRENCIES}`];
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
    }
  }
}
</style>
