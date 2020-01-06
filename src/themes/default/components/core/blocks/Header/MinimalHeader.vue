<template>
  <div class="header">
    <header
      class="fixed w-100 brdr-bottom-1 bg-cl-primary brdr-cl-secondary"
      :class="{ 'is-visible': true }"
    >
      <div class="container px15">
        <div class="row between-xs middle-xs">
          <div class="col-sm-4 col-xs-2 middle-xs">
            <div>
              <template>
                <a
                  class="inline-flex brdr-none p15 icon bg-cl-secondary pointer"
                  href="/"
                  data-testid="returnButton"
                >
                  <i class="material-icons">keyboard_backspace</i>
                </a>
              </template>
            </div>
          </div>
          <div class="col-xs-2 visible-xs" />
          <div class="col-sm-4 col-xs-4 center-xs">
            <div>
              <a class="no-underline inline-flex" href="/" data-testid="logo">
                <img width="auto" height="41px" src="/assets/logo.svg" :alt="$t(defaultTitle)">
              </a>
            </div>
          </div>
          <div class="col-xs-2 visible-xs" />
          <div class="col-sm-4 col-xs-2 end-xs">
            <div class="inline-flex right-icons" />
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

export default {
  data () {
    const storeView = currentStoreView()
    return {
      defaultTitle: storeView.seo.defaultTitle ? storeView.seo.defaultTitle : config.seo.defaultTitle
    }
  },
  mixins: [CurrentPage]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

header {
  height: 54px;
  top: -55px;
  z-index: 3;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
}
.icon {
  opacity: 0.6;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.right-icons {
  //for edge
  float: right;
}
.header-placeholder {
  height: 54px;
}
.links {
  text-decoration: underline;
}
@media (max-width: 767px) {
  .row.middle-xs {
    margin: 0 -15px;

    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
    padding-left: 0;
  }
  .col-xs-2:last-of-type {
    padding-right: 0;
  }
  a,
  span {
    font-size: 12px;
  }
}
</style>
