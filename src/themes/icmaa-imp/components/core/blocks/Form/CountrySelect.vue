<template>
  <base-select
    :options="countryOptions"
    :initial-option-text="$t('Country')"
    v-bind="{ ...$props, ...$attrs }"
    :value="country"
    @input="(v) => $emit('input', v)"
  />
</template>

<script>
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { getTranslatedCountries } from 'icmaa-config/helpers/countries'

export default {
  name: 'CountrySelect',
  components: {
    BaseSelect
  },
  props: {
    value: {
      type: [Object, String],
      required: true
    },
    preselectStoreViewLanguage: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      countries: getTranslatedCountries()
    }
  },
  computed: {
    country () {
      if (!this.value && this.preselectStoreViewLanguage) {
        return currentStoreView().i18n.defaultCountry
      }
      return this.value
    },
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  }
}
</script>
