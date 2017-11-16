<template>
<div class="searchpanel bg-white c-black" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 close c-black" @click="closeSearchpanel">close</i>
      </div>
    </div>
    <div class="col-md-12 end-xs">
      <input ref="search" v-model="search" @input="makeSearch" class="form-control input-lg search-input" :placeholder="placeholder" type="text" />
    </div>
    <div class="col-md-12 product-listing row">
      <product-tile @click.native="closeSearchpanel" :key="product.id" v-for='product in products' :product="product"></product-tile>
      <transition name="fade">
        <div v-if="emptyResults" class="center-text no-results">No results were found.</div>
      </transition>
    </div>
</div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
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
    EventBus.$on('focusSearchInput', () => {
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
      height: calc(100vh - 55px);
      width: 800px;
      top: 55px;
      right: 0;
      max-width: 100%;
      position: fixed;
      z-index: 3;
      transform: translateX(100%);
      transition: transform 300ms $motion-main;
      overflow-y: auto;
      overflow-x: hidden;

      .product-listing{
        padding-left: 35px;
        padding-top: 20px;

        .product{
          width: 30%;
          padding: 10px;
        }

      }

      input[type=text], input[type=email], input[type=tel] {
        padding: 10px 0;
        border: none;
        border-bottom: 1px solid #BDBDBD;
        width: calc(100% - 40px);
        font-size: 18px;
        outline: none;
        margin-right:20px;
       }

       .no-results{
          position: relative;
          top: 80px;
          display: inline-block;
          text-align: center;
          width: calc(100% - 40px);
          font-size: 1.3rem;
       }
  }
  .searchpanel.active {
      transform: translateX(0)
  }
  .close {
    cursor: pointer;
  }
  i {
    opacity: 0.6;
  }
  i:hover {
    opacity: 1;
  }

  @media only screen and (max-width:50em) { 
    .searchpanel .product-listing .product{
      width:auto;
    }
  }
</style>