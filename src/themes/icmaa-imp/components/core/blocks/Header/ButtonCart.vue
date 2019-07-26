<template>
  <button-icon icon="shopping_cart" title="Shopping cart" :quantity="quantity" @click="toggleMicrocart" />
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonIcon from 'theme/components/core/blocks/Header/ButtonIcon'

export default {
  components: {
    ButtonIcon
  },
  methods: {
    toggleMicrocart () {
      this.$store.dispatch('ui/toggleMicrocart')
    }
  },
  computed: {
    ...mapGetters({
      quantity: 'cart/getItemsTotalQuantity'
    })
  }
}
</script>
