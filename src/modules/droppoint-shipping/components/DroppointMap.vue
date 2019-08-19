<template>
  <div class="droppoint-map">
    <input type="text" v-model="searchZipcode" :placeholder="$t('Zipcode')">
    <button @click="getDroppoints">
      {{ $t('Update') }}
    </button>

    {{ error }}

    <span v-show="loading">Loading</span>
    <gmap-map class="map-container" :center="center" :zoom="12" :options="{streetViewControl:false, fullscreenControl: false}">
      <gmap-marker
        :key="index"
        v-for="(m, index) in droppoints"
        :position="m.position"
        :animation="selected.id === m.id? 1:0"
        :clickable="true"
        :icon="m.icon"
        @click="selectDroppoint(m)"
      />
    </gmap-map>

    <input type="text" v-model="shipping.phoneNumber" :placeholder="$t('Phone Number')"
           @keyup="$v.shipping.phoneNumber.$touch(); setShipping()"
    >
    <span
      class="validation-error"
      v-if="$v.shipping.phoneNumber.$error && !$v.shipping.phoneNumber.required"
    >
      {{ $t('Field is required') }}
    </span>

    <span :key="index" v-for="(field, index) in extraFields">
      {{ field.title }}
      <input type="text" v-model="shipping.extraFields[index]" @keyup="$v.shipping.extraFields[index].$touch(); setShipping()">

      <span
        class="validation-error"
        v-if="$v.shipping.extraFields[index].$error && !$v.shipping.extraFields[index].required"
      >
        {{ $t('Field is required') }}
      </span>

    </span>

    <span :key="index" v-for="(m, index) in droppoints" @click="selectDroppoint(m)">
      <label class="radioStyled">
        <p>{{ m.name }}</p>
        <p>{{ m.streetname }}</p>
        <p>{{ m.zipcode }} {{ m.city }}</p>
        <input type="radio" v-model="selected" :value="m">
        <span class="checkmark" />
      </label>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import { required, minLength } from 'vuelidate/lib/validators'
import { once } from '@vue-storefront/core/helpers'
import config from 'config'

// GoogleMaps cannot be included while in SSR
if (process.browser) {
  const VueGoogleMaps = require('vue2-google-maps')
  once('__VUE_EXTEND_DROPPOINT__', () => {
    Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyBQwWyTufRQqwJajpxqcCPfdgH27qKWNzc',
        libraries: 'places'
      }
    })
  })
}

export default {
  name: 'DroppointMap',
  data () {
    return {
      center: {lat: 55.488351, lng: 9.479296},
      droppoints: [],
      error: '',
      extraFields: {},
      loading: false,
      phoneNumber: null,
      searchZipcode: null,
      selected: {id: null},
      shipping: this.$store.state.checkout.shippingDetails
    }
  },
  props: {
    shippingMethod: {
      type: String,
      required: true
    },
    zipcode: {
      type: Number,
      default: null,
      required: false
    }
  },
  validations () {
    let val = {
      shipping: {
        phoneNumber: {
          required,
          minLength: minLength(8)
        }
      }
    }
    if (this.extraFields) {
      val.shipping.extraFields = {}
      for (const [key, value] of Object.entries(this.extraFields)) {
        val.shipping.extraFields[key] = {}
        if (value.required) {
          val.shipping.extraFields[key] = {required}
        }
      }
    }
    return val
  },
  methods: {
    selectDroppoint (m) {
      let phoneNumber = this.shipping.phoneNumber
      let extraFields = this.shipping.extraFields
      this.selected = m

      let nameArr = m.name.split(' ')
      let first = nameArr.shift()
      let last = nameArr.join(' ')

      if (last.length === 0) {
        last = ' - ' + first
      }

      this.shipping = {
        firstName: first,
        lastName: last,
        streetAddress: m.streetname,
        apartmentNumber: m.streetname2,
        zipCode: m.zipcode,
        city: m.city,
        droppoint: m,
        country: m.country,
        phoneNumber: phoneNumber,
        shippingMethod: this.shippingMethod,
        extraFields: extraFields
      }
      this.shipping.extraFields.droppoint = JSON.stringify(m)

      this.$v.$touch()
      this.setShipping()
    },
    setShipping (invalidate = false) {
      if (this.$v.$invalid || invalidate) {
        this.shipping.country = null
      } else {
        this.shipping.country = this.selected.country
      }
      this.$bus.$emit('checkout-after-shippingset', this.shipping)
    },
    setDroppoints (droppoints = []) {
      this.droppoints = droppoints
      this.center = droppoints[0].position
    },
    getDroppoints () {
      this.droppoints = []
      if (this.searchZipcode) {
        this.loading = true
        this.error = null
        let endpoint = config.droppointShipping[this.shippingMethod].endpoint

        this.$store.dispatch('droppoint-shipping/fetch', {
          url: endpoint + '/zipcode/' + encodeURIComponent(this.searchZipcode),
          payload: {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'
          },
          callback_event: 'droppoint-map-update'
        }, {root: true})
      }
    }
  },
  watch: {
    shippingMethod (val, oldVal) {
      if (val !== oldVal) {
        this.getDroppoints()
        this.selected = {}
        this.setShipping(true)
      }
    }
  },
  mounted () {
    if (this.shipping) {
      if (this.shipping.zipCode) {
        this.searchZipcode = this.shipping.zipCode
        this.getDroppoints()
      }

      if (
        (typeof this.shipping.droppoint === 'object') &&
        (this.shipping.droppoint.id !== null)
      ) {
        this.selectDroppoint(this.shipping.droppoint)
      } else {
        this.shipping.streetAddress = ''
      }
    }
    this.$bus.$on('droppoint-map-update', (event) => {
      this.loading = false
      if (event.result.droppoints) {
        this.setDroppoints(event.result.droppoints)

        if (event.result.center) {
          this.center = event.result.center.position
        }

        this.extraFields = event.result.extraFields
        this.shipping.extraFields = {}
      } else {
        this.error = event.result.error
      }
      this.setShipping()
    })
  },
  destroyed () {
    this.$bus.$off('droppoint-map-update')
  }
}
</script>

<style>
  .map-container {
    width: 600px;
    height: 400px;
  }
</style>
