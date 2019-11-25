<template>
  <div class="header">
    <header class="t-fixed t-w-full t-bg-white is-visible">
      <div class="t-h-60px t-flex">
        <div class="t-container t-px-4 t-flex t-items-center">
          <div class="t-flex t-w-full t-flex-wrap t-items-stretch">
            <a
              class="inline-flex brdr-none p15 icon bg-cl-secondary pointer"
              href="/"
              data-testid="returnButton"
            >
              <i class="material-icons">keyboard_backspace</i>
            </a>
          </div>
          <logo width="174" height="43" class="t-no-underline logo t-flex-fix t--mr-4 xl:t-mr-0 router-link-active" />
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'
import Logo from 'theme/components/core/blocks/Header/Logo'

export default {
  mixins: [CurrentPage],
  components: {
    Logo
  }
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
