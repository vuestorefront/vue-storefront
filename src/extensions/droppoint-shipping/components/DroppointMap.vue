<template>
  <div class="droppoint-map">
    <input type="text" v-model="searchZipcode" :placeholder="$t('Zipcode')">
    <button @click="getDroppoints">{{ $t('Update') }}</button>

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
        @click="selectDroppoint(m)" />
    </gmap-map>

    <input type="text" v-model="shipping.phoneNumber" :placeholder="$t('Phone Number')"
           @change="$v.shipping.phoneNumber.$touch(); setShipping"
    >
    <span
      class="validation-error"
      v-if="$v.shipping.phoneNumber.$error && !$v.shipping.phoneNumber.required"
    >
      Field is required
    </span>

    <span :key="index" v-for="(field, index) in extraFields">
      {{ field.title }}
      <input type="text" v-model="shipping.extraFields[index]" @change="setShipping">
    </span>

    <span :key="index" v-for="(m, index) in droppoints" @click="selectDroppoint(m)" >
      <label class="radioStyled">
        <p>{{ m.name }}</p>
        <p>{{ m.streetname }}</p>
        <p>{{ m.zipcode }} {{ m.city }}</p>
        <input type="radio" v-model="selected" :value="m" >
        <span class="checkmark"/>
      </label>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import { required, minLength } from 'vuelidate/lib/validators'

// GoogleMaps cannot be included while in SSR
if (process.browser) {
  const VueGoogleMaps = require('vue2-google-maps')
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBQwWyTufRQqwJajpxqcCPfdgH27qKWNzc',
      libraries: 'places'
    }
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
    'shipping-method': {
      type: String,
      required: true
    },
    zipcode: {
      type: Number,
      default: null,
      required: false
    }
  },
  validations: {
    shipping: {
      phoneNumber: {
        required,
        minLength: minLength(7)
      }
    }
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
    setShipping () {
      this.$bus.$emit('checkout-after-shippingset', this.shipping)
    },
    setDroppoints (droppoints = []) {
      this.droppoints = droppoints
      this.center = droppoints[0].position
    },
    getDroppoints () {
      if (this.searchZipcode) {
        this.loading = true
        this.error = null
        let endpoint = this.$config.droppointShipping[this.shippingMethod].endpoint

        this.$store.dispatch('droppoint-shipping/fetch', {
          url: endpoint + '/zipcode/' + this.searchZipcode,
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
        this.extraFields = event.result.extraFields
        this.shipping.extraFields = {}
      } else {
        this.error = event.result.error
      }
    })
  }
}
</script>

<style>
  .map-container {
    width: 600px;
    height: 400px;
  }
</style>
