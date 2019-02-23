import rootStore from '@vue-storefront/core/store'

export const ProductBundleOption = {
  name: 'ProductBundleOption',
  props: {
    option: {
      type: Object,
      required: true
    },
    errorMessages: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      productOptionId: null,
      quantity: 1
    }
  },
  computed: {
    productBundleOption() {
      return `bundleOption_${this.option.option_id}`
    },
    bundleOptionName() {
      return `bundleOption_${this._uid}_${this.option.option_id}_`
    },
    quantityName() {
      return `bundleOptionQty_${this.option.option_id}`
    },
    value() {
      return this.option.product_links.find(product => product.id === this.productOptionId)
    },
    errorMessage() {
      return this.errorMessages ? this.errorMessages[this.quantityName] : ""
    }
  },
  mounted() {
    this.setDefaultValues()
    if (rootStore.state.config.usePriceTiers) {
      this.$bus.$on('product-after-setup-associated', this.setDefaultValues)
    }
  },
  beforeDestroy () {
    if (rootStore.state.config.usePriceTiers) {
      this.$bus.$off('product-after-setup-associated', this.setDefaultValues)
    }
  },
  watch: {
    productOptionId(value) {
      this.bundleOptionChanged()
    },
    quantity(value) {
      this.bundleOptionChanged()
    }
  },
  methods: {
    setDefaultValues() {
      if(this.option.product_links) {
        const defaultOption = this.option.product_links.find(pl => { return pl.is_default })
        this.productOptionId = defaultOption ? defaultOption.id : this.option.product_links[0].id
        this.quantity = defaultOption ? defaultOption.qty : 1
      }
    },
    bundleOptionChanged() {
      this.$emit('optionChanged', {
        option: this.option,
        fieldName: this.productBundleOption, 
        qty: this.quantity,
        value: this.value
      })
    }
  }
}
