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
                <return-icon class="p15 icon bg-cl-secondary pointer" to="/" />
              </template>
            </div>
          </div>
          <div class="col-xs-2 visible-xs">
            <search-icon class="p15 icon pointer" />
          </div>
          <div class="col-sm-4 col-xs-4 center-xs">
            <div>
              <logo width="36px" height="41px"/>
            </div>
          </div>
          <div class="col-xs-2 visible-xs">
            <wishlist-icon class="p15 icon pointer" />
          </div>
          <div class="col-sm-4 col-xs-2 end-xs">
            <div class="inline-flex right-icons" />
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder"/>
  </div>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'
import Header from '@vue-storefront/core/components/blocks/Header/Header'
import Logo from 'theme/components/core/Logo'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'

export default {
  components: {
    WishlistIcon,
    SearchIcon,
    Logo,
    ReturnIcon
  },
  mixins: [Header, CurrentPage]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

header {
  height: 54px;
  top: -55px;
  z-index: 2;
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
  a, span {
    font-size: 12px;
  }
}
</style>
