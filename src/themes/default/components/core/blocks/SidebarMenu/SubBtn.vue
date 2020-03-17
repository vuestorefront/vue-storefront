<template>
  <button
    v-if="type === 'next'"
    class="inline-flex between-xs w-100 px25 py20 pr15 serif cl-accent"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    {{ name }}
    <i class="material-icons">keyboard_arrow_right</i>
  </button>
  <button
    v-else
    class="inline-flex p15 between-xs"
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    {{ name }}
    <i class="material-icons">keyboard_arrow_left</i>
  </button>
</template>
<script>
import { mapState } from 'vuex'
import config from 'config'
export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    },
    name: {
      type: String,
      default: ''
    },
    isCategory: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
      if (config.entities.category.categoriesDynamicPrefetch && this.isCategory) this.$store.dispatch('category/list', { parent: this.id })
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-gray: color(gainsboro);
$color-black: color(matterhorn);

button {
  i {
    color: $color-gray;
    font-size: 28px;
    line-height: 24px;
  }
  &:hover,
  &:focus {
    i {
      color: $color-black;
    }
  }
}
</style>
