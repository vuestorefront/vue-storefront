<template>
  <div
    class="searchpanel fixed mw-100 bg-cl-primary cl-accent"
    :class="{ active: isOpen }"
    data-testid="searchPanel"
  >
    <div class="close-icon-row">
      <i
        class="material-icons pointer cl-accent close-icon"
        @click="closeSearchpanel"
        data-testid="closeSearchPanel"
      >
        close
      </i>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 end-xs">
          <label for="search" class="visually-hidden">
            {{ $t('Search') }}
          </label>
          <div class="search-input-group">
            <i
              class="material-icons search-icon"
            >
              search
            </i>
            <input
              ref="search"
              id="search"
              v-model="search"
              @input="makeSearch"
              class="search-panel-input"
              :placeholder="$t('Type what you are looking for...')"
              type="text"
            >
          </div>
        </div>
      </div>
      <div class="product-listing row">
        <product-tile @click.native="closeSearchpanel" :key="product.id" v-for="product in products" :product="product"/>
        <transition name="fade">
          <div v-if="emptyResults" class="no-results relative center-xs h4 col-md-12">
            {{ $t('No results were found.') }}
          </div>
        </transition>
      </div>
      <div v-show="OnlineOnly" v-if="products.length >= 18" class="buttons-set align-center py35 mt20 px40">
        <button @click="seeMore" v-if="readMore"
                class="no-outline brdr-none py15 px20 bg-cl-mine-shaft :bg-cl-th-secondary cl-white fs-medium-small"
                type="button">
          {{ $t('Load more') }}
        </button>
        <button @click="closeSearchpanel"
                class="no-outline brdr-none p15 fs-medium-small close-button"
                type="button">
          {{ $t('Close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import ProductTile from 'theme/components/core/ProductTile'
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  components: {
    ProductTile
  },
  mixins: [SearchPanel, VueOfflineMixin],
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel) {
        this.$refs.search.focus()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import "~theme/css/variables/grid";
@import "~theme/css/variables/typography";

.searchpanel {
  height: 100vh;
  width: 928px;
  top: 0;
  right: 0;
  z-index: 3;
  transform: translateX(100%);
  transition: transform 300ms $motion-main;
  overflow-y: auto;
  overflow-x: hidden;

  .close-icon-row {
    display: flex;
    justify-content: flex-end;
  }

  .container {
    padding-left: 40px;
    padding-right: 40px;

    @media #{$media-xs} {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .row {
    margin-left: - map-get($grid-gutter-widths, lg) / 2;
    margin-right: - map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      margin-right: - map-get($grid-gutter-widths, xs) / 2;
      margin-left: - map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .col-md-12 {
    padding-left: map-get($grid-gutter-widths, lg) / 2;
    padding-right: map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      padding-left: map-get($grid-gutter-widths, xs) / 2;
      padding-right: map-get($grid-gutter-widths, xs) / 2;
    }
  }

  .product-listing {
    padding-top: 30px;
  }

  .product {
    box-sizing: border-box;
    width: 33.33%;
    padding-left: map-get($grid-gutter-widths, lg) / 2;
    padding-right: map-get($grid-gutter-widths, lg) / 2;

    @media #{$media-xs} {
      width: 50%;
      padding-left: map-get($grid-gutter-widths, xs) / 2;
      padding-right: map-get($grid-gutter-widths, xs) / 2;
    }
  }

  &.active {
    transform: translateX(0);
  }

  .close-icon {
    padding: 18px 8px;
  }

  .search-input-group {
    display: flex;
    border-bottom: 1px solid #bdbdbd;
  }

  .search-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-panel-input {
    width: 100%;
    height: 60px;
    padding-bottom: 0;
    padding-top: 0;
    border: none;
    outline: 0;
    font-size: 18px;
    font-family: map-get($font-families, secondary);

    @media #{$media-xs} {
      font-size: 16px;
    }
  }

  .no-results {
    top: 80px;
    width: 100%;
  }

  i {
    opacity: 0.6;
  }

  i:hover {
    opacity: 1;
  }

  .close-button {
    background: #fff;
  }

  button {
    @media #{$media-xs} {
      width: 100%;
      margin-bottom: 15px;
    }
  }
}
</style>
