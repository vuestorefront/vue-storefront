<template>
  <div class="t-flex t-w-full t-flex-wrap t-items-stretch">
    <input type="text" class="t-flex-1 t-w-px md:t-flex-fix md:t-w-1/2 lg:t-w-2/5 t-leading-normal t-rounded-none t-border-0 t-border-b t-border-base-light t-h-10 t-pl-3 t-pr-1 t-text-sm t-text-base-darkest placeholder:t-opacity-100 placeholder:t-text-base-light" :placeholder="$t('Search')" v-model="search" @focus="toggleSearchpanel">
    <div class="t-flex t-items-center t-border-b t-border-base-light t-cursor-pointer" @click="toggleSearchpanel">
      <material-icon icon="search" class="t-pr-1" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  components: {
    MaterialIcon
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.ui.searchpanel
    })
  },
  methods: {
    toggleSearchpanel () {
      this.$store.commit('ui/setSearchpanel', !this.isOpen)
    },
    updateSearch (payload) {
      this.search = payload.search
    }
  },
  beforeMount () {
    this.$bus.$on('search-input-change', this.updateSearch)
  },
  mounted () {
    this.search = localStorage.getItem(`shop/user/searchQuery`);
  }
}
</script>
