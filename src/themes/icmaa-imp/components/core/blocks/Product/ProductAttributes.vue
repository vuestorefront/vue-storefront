<template>
  <li class="t-flex" v-if="valuesRaw.length > 0">
    <span class="t-w-5/12 lg:t-w-2/6 t-font-bold t-overflow-auto t-webkit-touch">{{ label|htmlDecode }}</span>
    <span class="t-w-7/12 lg:t-w-4/6 t-pl-2">
      <template v-for="(value, index) in values">
        <template v-if="value.optionLink">
          <router-link :to="value.optionLink" :title="label + ' - ' + value.optionLabel" class="t-text-base-dark" v-text="value.optionLabel" :key="'key-' + index" /><span v-if="valuesCount !== index" v-text="', '" :key="'spacer-' + index" />
        </template>
        <template v-else>
          <span v-text="value.optionLabel" :key="'key-' + index" /><span v-if="valuesCount !== index" v-text="', '" :key="'spacer-' + index" />
        </template>
      </template>
    </span>
  </li>
</template>

<script>
import config from 'config'
import { date } from '@vue-storefront/core/filters/date'

import { mapGetters } from 'vuex'
import { ProductAttribute } from '@vue-storefront/core/modules/catalog/components/ProductAttribute'

export default {
  name: 'ProductAttributes',
  data: function () {
    return {
      map: config.icmaa.catalog.attribute.category_links
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    attribute: {
      type: null,
      required: true
    }
  },
  computed: {
    ...mapGetters('attribute', { getOptionLabel: 'getOptionLabel' }),
    attributeCode () {
      return this.attribute.attribute_code
    },
    label () {
      return (this.attribute && this.attribute.frontend_label) ? this.attribute.frontend_label : ((this.attribute && this.attribute.default_frontend_label) ? this.attribute.default_frontend_label : '')
    },
    isSelect () {
      return ['multiselect', 'select'].includes(this.attribute.frontend_input)
    },
    isDate () {
      return ['date', 'datetime'].includes(this.attribute.frontend_input)
    },
    valuesRaw () {
      let values = this.product[this.attributeCode]

      if (!values || values === '' || (values.length === 1 && values[0] === '')) {
        return []
      } else if (this.isDate) {
        return [date(values)]
      } else if (!this.isSelect || typeof values !== 'object') {
        return [values.toString()]
      } else if (typeof values === 'string') {
        const split = values.split(',')
        return split.length > 0 ? split : [values]
      }

      return values
    },
    values () {
      return this.valuesRaw.map(optionId => {
        return {
          optionLabel: this.isSelect ? this.getOptionLabel({ attributeKey: this.attributeCode, optionId }) : optionId,
          optionLink: (this.isSelect && this.attributeLinks && this.attributeLinks[optionId]) ? this.attributeLinks[optionId] : false
        }
      })
    },
    valuesCount () {
      return this.values.length - 1
    },
    attributeLinks () {
      return this.map[this.attributeCode] || false
    }
  }
}
</script>
