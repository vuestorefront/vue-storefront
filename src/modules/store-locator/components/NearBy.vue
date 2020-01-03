<template>
  <no-ssr>
    <div class="store-card">
      <!-- TODO : make my store button rounded -->
      <Title :store-name="store.locationName" :my-store="MyStore" v-if="currentUser" />
      <Title :store-name="store.locationName" v-if="!currentUser" />
      <div class="store-info">
        <Address :address="store.address" />
        <div v-if="store.regularHours">
          <OpenStatus :regular-hours="store.regularHours" />
        </div>
        <p v-if="!store.regularHours">
          {{ $t('open time not available') }}
        </p>
        <p v-if="store.primaryPhone">
          {{ store.primaryPhone }}
        </p>
        <p v-if="!store.primaryPhone">
          {{ $t( 'Phone number not available') }}
        </p>
      </div>
      <div class="row m5 display-inline">
        <ButtonOutline @click.native="storeInfo()" color="dark" class="col-xs-12 col-sm-6 col-md-6 mr5 mb5">
          {{ $t('Store Info') }}
        </ButtonOutline>
        <ButtonOutline @click.native="makeItMyStore()" color="dark" class="col-xs-12 col-sm-6 col-md-6" v-if="currentUser">
          {{ $t('Make it my store') }}
        </ButtonOutline>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import Title from './Title';
import StoreInfoButton from './StoreInfoButton';
import NoSSR from 'vue-no-ssr'
import Address from './Address'
import { mapState } from 'vuex'
import OpenStatus from './OpenStatus'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import SetMyStore from '../mixins/setMyStore'

export default {
  components: {
    Title,
    StoreInfoButton,
    Address,
    OpenStatus,
    ButtonOutline,
    SetMyStore,
    'no-ssr': NoSSR
  },
  props: {
    store: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      isOpen: state => state.pickupInStore.storeInfo,
      currentUser: state => state.user.current
    }),
    MyStore () {
      if (this.currentUser) {
        return this.store.storeCode === this.currentUser.storeCode
      }
      return false
    }
  },
  methods: {
    storeInfo () {
      this.$store.commit('storeLocator/storeLocator/SET_SELECTED_STORE', this.store);
      this.$store.commit('storeLocator/storeLocator/SET_STORE_INFO', !this.isOpen)
      this.$store.commit('ui/setOverlay', !this.isOpen);
    },
    async makeItMyStore () {
      await this.setMyStore(this.store.storeCode)
      this.$store.dispatch('user/me', { refresh: true, useCache: false })
    }
  },
  mixins: [SetMyStore]
};
</script>

<style lang="scss" scoped>
.store-info {
  padding: 10px 10px;
}
.store-card {
  background-color: #eeeeee;
  margin: 10px;
  text-align: left;
  width: 100%;
}
.status-color {
  color: green;
}
.display-inline {
  @media (min-width: 1025px) {
     display: -webkit-inline-box;
  }
}
.button-outline {
  border: 2px solid;
  min-width: 250px;
  @media (min-width: 768px) {
    border: 2px solid;
    min-width: 250px;
    width: auto;
  }
}
.nearby-btn {
  justify-content: center
}
</style>
