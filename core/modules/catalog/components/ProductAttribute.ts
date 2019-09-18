export const ProductAttribute = {
  name: 'ProductAttribute',
  props: {
    product: {
      type: Object,
      required: true
    },
    attribute: {
      type: null,
      required: true
    },
    emptyPlaceholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    label () {
      return (this.attribute && this.attribute.frontend_label) ? this.attribute.frontend_label : ((this.attribute && this.attribute.default_frontend_label) ? this.attribute.default_frontend_label : '')
    },
    value () {
      let parsedValues = this.product[this.attribute.attribute_code]

      if (!parsedValues) {
        return this.emptyPlaceholder
      } else if (this.attribute.frontend_input !== 'multiselect' && this.attribute.frontend_input !== 'select') {
        return parsedValues.toString()
      } else {
        parsedValues = typeof parsedValues === 'string' ? parsedValues.split(',') : parsedValues

        if (!Array.isArray(parsedValues)) {
          parsedValues = [parsedValues]
        }

        let results = []
        for (let parsedVal of parsedValues) {
          if (this.attribute.options) {
            let option = this.attribute.options.find(av => {
              /* eslint eqeqeq: "off" */
              return av.value == parsedVal
            })
            if (option) {
              results.push(option.label)
            } else {
              results.push(parsedVal)
            }
          } else {
            results.push(parsedVal)
          }
        }
        return results.join(', ')
      }
    }
  }
}
