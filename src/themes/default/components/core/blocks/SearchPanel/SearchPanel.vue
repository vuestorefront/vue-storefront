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
import SearchPanel from '@vue-storefront/core/components/blocks/SearchPanel/SearchPanel'
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

.searchpanel {
  height: 100vh;
  width: 800px;
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
  }

  .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  .col-md-12 {
    padding-left: 15px;
    padding-right: 15px;
  }

  .product-listing {
    padding-top: 30px;
  }

  .product {
    box-sizing: border-box;
    width: 33.33%;
    padding-left: 15px;
    padding-right: 15px;
  }

  &.active {
    transform: translateX(0)
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
    border: none;
    width: 100%;
    padding-bottom: 0px;
    padding-top: 0px;
    outline: 0;
    height: 60px;
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
}

@media only screen and (max-width:575.98px) {
  .searchpanel {

     .container {
      padding-left: 30px;
      padding-right: 30px;
    }

    .row {
      margin-right: -10px;
      margin-left: -10px;
    }

    .col-md-12 {
      padding-left: 10px;
      padding-right: 10px;
    }

    .product {
      width: 50%;
      padding-left: 10px;
      padding-right: 10px;
    }

    button {
      width: 100%;
      margin-bottom: 15px;
    }
  }
}
</style>
