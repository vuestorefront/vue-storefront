import { mapState } from 'vuex'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { CompareButton } from '@vue-storefront/core/modules/compare/components/CompareButton.ts'

export default {
  name: 'SidebarMenu',
  mixins: [onEscapePress, CompareButton],
  computed: {
    categories () {
      return this.$store.state.category.list.filter((op) => {
        return op.level === 2 // display only the root level (level =1 => Default Category)
      })
    },
    ...mapState({
      isOpen: state => state.ui.sidebar
    }),
    compareIsActive () {
      // Computed property renamed to 'isEmpty'
      return !this.isEmpty
    }
  },
  created () {
    this.$store.dispatch('category/list', {})
  },
  methods: {
    onEscapePress () {
      this.closeMenu()
    },
    closeMenu () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
    }
  }
}
