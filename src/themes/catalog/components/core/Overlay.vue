<script>
import { coreComponent } from 'lib/themes'

export default {
  methods: {
    close () {
      this.$store.commit('ui/setOverlay', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setWishlist', false)
      this.$store.commit('ui/setSearchpanel', false)
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setSignUp', false)
    }
  },
  mixins: [coreComponent('core/Overlay')]
}
</script>
