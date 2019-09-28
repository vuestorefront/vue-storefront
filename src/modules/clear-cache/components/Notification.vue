<template>
  <transition name="fade" appear>
    <div class="cache fixed w-100 bg-cl-th-accent cl-tertiary" v-if="isOpen">
      <div class="container">
        <div class="row between-xs middle-xs px15">
          <div class="col-xs-10 start-xs">
            <span class="pr5">
              {{ $t('A new version of the site has appeared, for correct operation, please reload the page.') }}
            </span>
            <span @click="reload" class="cl-bg-tertiary reload">
              {{ $t('Reload.') }}
            </span>
          </div>
          <div class="col-xs-2 end-xs">
            <i
              class="material-icons icon p15 pointer"
              @click="close"
              @keyup.enter="close"
              data-testid="closeCacheButton"
              tabindex="0"
              role="button"
            >
              close
            </i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CacheNotification',
  computed: {
    isOpen () {
      return this.$store.state['clear-cache'].open
    }
  },
  methods: {
    reload () {
      if (window) {
        location.reload()
      }
    },
    close () {
      this.$store.dispatch('clear-cache/toggleOpen', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon: color(black);
$bg-icon: color(suva-gray);
.cache {
  z-index: 10;
  bottom: 0;
}
.icon:hover {
  color: $color-icon;
  background-color: $bg-icon;
}
.reload {
  cursor: pointer;
}
</style>
