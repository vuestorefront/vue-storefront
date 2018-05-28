import { mapActions } from 'vuex'

// Change to not use mapActions
export default {
  methods: {
    ...mapActions({ 'removeFromCart': 'cart/removeItem' })
  }
}
