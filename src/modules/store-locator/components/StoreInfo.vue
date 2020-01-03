<template>
  <div class="wishlist cl-accent">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 pointer cl-accent" @click="closeStoreInfopanel">close</i>
      </div>
    </div>
    <div class="row middle-xs px40">
      <h2 class="col-xs-12 col-sm cl-accent">
        {{ $t('Store Details') }}
      </h2>
    </div>
    <div class="px40">
      <h4>
        {{ selectedStore.locationName }}
      </h4>
      <Address :address="selectedStore.address" />
      <h4>
        {{ selectedStore.primaryPhone }}
      </h4>
      <div v-if="selectedStore.regularHours">
        <div v-for=" (period,index) in selectedStore.regularHours.periods" :key="`store-${index}`">
          <p>{{ period.openDay }}: {{ tConvert(period.openTime) }} - {{ tConvert(period.closeTime) }} </p>
        </div>
      </div>
      <div v-if="selectedStore.latlng">
        <Map :latlong="selectedStore.latlng" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonFull from 'src/themes/default/components/theme/ButtonFull';
import i18n from '@vue-storefront/i18n';
import Address from './Address'
export default {
  components: {
    ButtonFull,
    Address,
    'Map': () => import('./Map.vue')
  },
  data: function () {
    return {
      city: '',
      findStore: ''
    }
  },
  computed: {
    ...mapState({
      selectedStore: state => state.storeLocator.selectedStore
    })
  },
  methods: {
    closeStoreInfopanel () {
      this.$store.commit('storeLocator/storeLocator/SET_STORE_INFO', false)
      this.$store.commit('ui/setOverlay', false);
    },
    tConvert (time) {
      // Check correct time format and split into components
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(''); // return adjusted time or original string
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/grid";

.close-button {
    background: #fff;
}
button {
    @media #{$media-xs} {
      width: 100%;
      margin-bottom: 15px;
    }
}
.display-inline{
    display: inline-flex;
}
.text-center{
    text-align: center;
}
.search-input{
    width:100%;
    font-size: 16px;
}
.border-btm {
    border-bottom: 1px solid gray;
}
.store-nav {
    margin:0px;
    padding:0 40px;
    @media (max-width: 767px) {
      margin:0px;
      padding:0 10px;
    }
}
.store-head {
    padding:0 40px;
    margin:0px;
    @media (max-width: 767px) {
      margin:0px;
      padding:0 10px;
    }
}
.store-input {
    margin:20px 40px;
    @media (max-width: 767px) {
      margin:20px 10px;
    }
}
.store-btn {
    padding:0 40px;
    margin-top:20px;
    @media (max-width: 767px) {
     padding:0 10px;
     margin-top:20px;
    }
}
.stock-checkbox {
  height: 18px;
  width:5%;
}
.stock-m {
  margin: 0 0px;
  @media (max-width: 767px) {
    margin: 0 10px;
  }
}
.stock-display {
    display:flex;
    padding: 0 32px;
    margin-top:15px;
  @media (max-width: 767px) {
    padding:0 10px;
    margin-top:15px;
  }
}
.stock-span {
  color:green;
}
</style>
