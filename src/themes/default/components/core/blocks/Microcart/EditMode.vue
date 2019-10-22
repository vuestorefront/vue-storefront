<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditMode',
  computed: {
    ...mapGetters('themeCart', ['isEditMode', 'getEditingProductId', 'getSelectedOptions', 'getEditingQty'])
  },
  methods: {
    openEditMode () {
      this.$store.dispatch('themeCart/configureProduct', { product: this.product }).then(() => {
        const selectedOptions = Object.assign({}, this.getSelectedFilters)
        this.$store.dispatch('themeCart/openEditMode', { product: this.product, selectedOptions })
      })
    },
    editModeSetFilters (filterOptions) {
      this.$store.dispatch('themeCart/editModeSetFilters', { filterOptions })
    },
    editModeSetQty (qty) {
      this.$store.dispatch('themeCart/editModeSetQty', { qty })
    },
    closeEditMode () {
      this.$store.dispatch('themeCart/closeEditMode')
    },
    updateVariant () {
      const { size, color } = this.getSelectedOptions
      const configuration = {
        size: { id: size.id, attribute_code: size.type, label: size.label },
        color: { id: color.id, attribute_code: color.type, label: color.label }
      }
      this.product.qty = this.getEditingQty
      this.$store.dispatch('cart/configureItem', { product: this.product, configuration })
    }
  }
}
</script>
