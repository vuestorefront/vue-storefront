<template>
  <sidebar class="t-absolute t-top-0 t-w-full" :style="{ left: `${(index + 1) * 100}%` }" :title="sidebar.title" :close-on-click="false">
    <template v-slot:top>
      <top-button icon="keyboard_arrow_left" text="Back" :tab-index="1" @click.native="close" class="t-text-base" />
    </template>
    <component :is="component" @close="close" @reload="getComponent" v-bind="sidebar.props" />
  </sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from 'theme/components/theme/blocks/AsyncSidebar/Sidebar'
import TopButton from 'theme/components/theme/blocks/AsyncSidebar/TopButton'
import LoadingSpinner from 'theme/components/theme/blocks/AsyncSidebar/LoadingSpinner.vue'
import LoadingError from 'theme/components/theme/blocks/AsyncSidebar/LoadingError.vue'

export default {
  name: 'AsyncSidebarSubmenu',
  components: {
    Sidebar,
    TopButton
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    asyncComponent: {
      type: Function,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      component: null
    }
  },
  created () {
    this.getComponent()
  },
  computed: {
    ...mapGetters({ sidebarPath: 'ui/getSidebarPath' }),
    sidebar () {
      return this.sidebarPath[this.index]
    }
  },
  methods: {
    getComponent () {
      this.component = () => ({
        component: this.asyncComponent(),
        loading: LoadingSpinner,
        error: LoadingError,
        timeout: 3000
      })
    },
    close () {
      this.$store.dispatch('ui/removeLastSidebarPath')
      this.$emit('close')
    }
  }
}
</script>
