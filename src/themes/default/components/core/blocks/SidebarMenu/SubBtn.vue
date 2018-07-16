<template>
  <button
    class="inline-flex between-xs w-100 px25 py20 pr15 serif cl-accent"
    v-if="type === 'next'"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    {{ name }}
    <i class="material-icons">keyboard_arrow_right</i>
  </button>
  <button
    class="inline-flex p15 between-xs"
    v-else
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
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
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
