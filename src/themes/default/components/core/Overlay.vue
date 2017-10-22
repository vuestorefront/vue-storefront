<script>
import { coreComponent } from 'lib/themes'

export default {
  methods: {
    onClick () {
      this.$store.commit('ui/setOverlay', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSidebar', false)
    }
  },
  mixins: [coreComponent('core/Overlay')]
}
</script>
