<template>
    <span>{{value|htmlDecode}}</span>
</template>

<script>
  import { coreComponent } from 'lib/themes'

  export default {
    data () {
      return {
        value: ''
      }
    },
    beforeMount () {
      let parsedValues = this.product[this.attribute.attribute_code]

      if (!parsedValues) {
        this.value = this.emptyPlaceholder
      } else {
        parsedValues = parsedValues.split(',')
        let results = []
        for (let parsedVal of parsedValues) {
          if (this.attribute.options) {
            let option = this.attribute.options.find(av => {
              /* eslint eqeqeq: "off" */
              return av.value == parsedVal
            })
            if (option) {
              results.push(option.label)
            }
          } else {
            results.push(parsedVal)
          }
        }
        this.value = results.join(', ')
      }
    },
    mixins: [coreComponent('core/blocks/Compare/ProductAttribute')]
  }
</script>
