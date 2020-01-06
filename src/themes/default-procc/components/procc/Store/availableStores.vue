<template>
  <div class="container pt30 pb30">
    <div class="row">
      <div class="col-md-3 start-xs category-filters">
        <div class="sidebar">
          <h4 class="sidebar__header">
            <span> {{ $t('Filter') }} </span>
            <button
              class="no-outline brdr-none py15 px40 bg-cl-mine-shaft :bg-cl-th-secondary ripple h5 cl-white sans-serif" @click="clearFilter()" v-if="isActive != false"
            >
              {{ $t('Clear') }}
            </button>
          </h4>
          <div>
            <h5>Store Name</h5>
            <div class="button-div">
              <button
                class="bg-cl-primary brdr-1 brdr-cl-primary brdr-square h5 cl-tertiary name-selector" :class="{'active': isActive == 'asc'}" @click="sortStore('asc')"
              >
                Ascending
              </button>
              <button
                class="pt2 bg-cl-primary brdr-1 brdr-cl-primary brdr-square h5 cl-tertiary name-selector" :class="{'active': isActive == 'desc'}" @click="sortStore('desc')"
              >
                Descending
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 justify-content-center">
        <div class="row">
          <div class="col-md-4" v-for="(storeView, storeCode) in stores" :key="storeCode" v-if="!storeView.disabled && typeof storeView === 'object' && storeView.i18n">
            <a :href="storeView.url">
              <store-card :store-code="storeView.storeCode" :store-name="storeView.name" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StoreCard from 'theme/components/procc/Store/StoreCard'
import store from '@vue-storefront/core/store'
import _ from 'lodash'

export default {
  components: {
    StoreCard
  },
  methods: {
    sortStore (sort) {
      this.isActive = sort
      let availableStores = store.state.config.storeViews
      this.stores = _.orderBy(availableStores, ['storeCode'], sort.toString())
      store.state.config.storeViews = this.stores
    },
    clearFilter () {
      this.isActive = false
      store.state.config.storeViews = this.defaultStoreViews
      this.stores = this.defaultStoreViews
    }
  },
  mounted () {
    this.defaultStoreViews = store.state.config.storeViews
  },
  data () {
    return {
      defaultStoreViews: '',
      isActive: false,
      stores: store.state.config.storeViews
    }
  },
  computed: {
    storeViews () {
      return store.state.config.storeViews
    }
  }
}
</script>
<style lang="scss">
  .justify-content-center {
    justify-content: center;
  }
  .sidebar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 47px;
  }
  .name-selector {
    padding: 5px
  }
  .name-selector.active {
    border-color: #828282;
    border-width: 2px;
    color: #828282;
  }
  .button-div{
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 65px;
  }
  .button-div button {
    width: 90px
  }
</style>
