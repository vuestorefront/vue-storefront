<template>
  <div class="searchpanel fixed mw-100 bg-white c-black" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 pointer c-black" @click="closeSearchpanel">close</i>
      </div>
    </div>
    <div class="col-md-12 end-xs">
      <input
        ref="search"
        v-model="search"
        @input="makeSearch"
        class="mr20 py10 brdr-none brdr-bottom brdr-c-lightgray-secondary no-outline h4"
        :placeholder="placeholder"
        type="text"
      >
    </div>
    <div class="col-md-12 product-listing pl35 pt20 row">
      <product-tile @click.native="closeSearchpanel" :key="product.id" v-for="product in products" :product="product"/>
      <transition name="fade">
        <div v-if="!emptyResults" class="no-results relative center-xs h4">No results were found.</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ProductTile from '../../ProductTile.vue'

export default {
  data () {
    return {
      emptyResults: false,
      search: '',
      placeholder: 'Type what you are looking for...'
    }
  },
  components: {
    ProductTile
  },
  methods: {
  },
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel) {
        this.$refs.search.focus()
      }
    })
  },
  mixins: [coreComponent('core/blocks/SearchPanel/SearchPanel')]
}
</script>

<style lang="scss" scoped>
@import "../../../../css/transitions.scss";

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

  &.active {
    transform: translateX(0)
  }

  .product {
    width: 30%;
    padding: 10px;
  }

  input {
    width: calc(100% - 40px);
  }

  .no-results {
    top: 80px;
    width: calc(100% - 40px);
  }
}

i {
  opacity: 0.6;
}

i:hover {
  opacity: 1;
}

@media only screen and (max-width:50em) {
  .searchpanel .product {
    width: auto;
  }
}
</style>
