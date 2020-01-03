<template>
  <no-ssr>
    <div>
      <gmap-map
        :center="center"
        :zoom="7"
        style="width:100%;  height: 400px;"
      >
        <GmapMarker ref="myMarker"
                    :position="google && new google.maps.LatLng(latlong.latitude, latlong.longitude)"
        />
      </gmap-map>
    </div>
  </no-ssr>
</template>

<script>
import Vue from 'vue'
import { once } from '@vue-storefront/core/helpers'
import * as VueGoogleMaps from 'vue2-google-maps'
import NoSSR from 'vue-no-ssr'
import {gmapApi} from 'vue2-google-maps'
import config from 'config'

// GoogleMaps cannot be included while in SSR
if (process.browser) {
  once('__VUE_EXTEND_STORELOCATOR__', () => {
    Vue.use(VueGoogleMaps, {
      load: config.map_configuration
    })
  })
}
export default {
  components: {
    'no-ssr': NoSSR
  },
  computed: {
    google: gmapApi
  },
  data: function () {
    return {
      center: config.i18n.centerPoint
    }
  },
  props: {
    latlong: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~theme/css/base/text';
    @import '~theme/css/variables/colors';
    @import '~theme/css/helpers/functions/color';
    $color-tertiary: color(tertiary);
</style>
