<template>
  <ul class="t-text-sm t-list-disc t-list-outside t-pl-6">
    <li v-for="(feature, index) in features" :key="index" :class="{ 't-mb-2': features.length -1 !== index }" v-html="feature" />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import FeaturesMixin from 'theme/mixins/product/featuresMixin'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  mixins: [ FeaturesMixin ],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getAttributeLabel: 'attribute/getAttributeLabel',
      getOptionLabel: 'attribute/getOptionLabel'
    }),
    numerative () {
      return ['uk', 'en', 'us'].includes(currentStoreView().i18n.defaultLanguage.toLowerCase())
        ? 'imperial' : 'metric'
    },
    featureValues () {
      return this.getValues(this.featureAttributes)
    },
    contentValues () {
      return this.getValues(this.contentAttributes)
    },
    conversionValues () {
      return this.conversionAttributes.map(attributeCode => {
        let value = this.product[attributeCode]
        if (!value || value === '') {
          return false
        }

        let values = value.split('x')
        values = values.length > 0 ? values : [value]
        const conversionRate = this.conversionRate[attributeCode]
        const conversionUnit = this.conversionUnit[attributeCode]

        values = values.map(v => {
          return this.round(conversionRate * parseFloat(v)) + conversionUnit
        })

        value = values.join(' x ')
        const label = this.getAttributeLabel({ attributeKey: attributeCode })

        return { label, value }
      }).filter(a => a !== false)
    },
    conversionRate () {
      return this.conversionRates[this.numerative]
    },
    conversionUnit () {
      return this.conversionUnits[this.numerative]
    },
    features () {
      let features = []

      // Content values
      this.contentValues.forEach(option => {
        const label = this.getAttributeLabel({ attributeKey: option.attributeCode })
        const optionLabels = option.values.map(optionId => this.getOptionLabel({ attributeKey: option.attributeCode, optionId }))
        features.push(`${label}: ${optionLabels.join(', ')}`)
      })

      // Default features
      this.featureValues.forEach(option => {
        const attributeKey = option.attributeCode
        const optionLabels = option.values.map(optionId => this.getOptionLabel({ attributeKey, optionId }))
        features = [...features, ...optionLabels]
      })

      // Conversion values
      this.conversionValues.forEach(option => {
        features.push(`${option.label}: ${option.value}`)
      })

      return features
    }
  },
  methods: {
    getValues (attributes) {
      const attributesValues = []
      attributes.forEach(attributeCode => {
        let values = this.product[attributeCode]
        if (!values || values === '' || (values.length === 1 && values[0] === '')) {
          return
        }

        attributesValues.push({ attributeCode, values })
      })

      return attributesValues
    },
    round (v) {
      return Math.round(parseFloat(v) * 100) / 100
    }
  }
}
</script>
