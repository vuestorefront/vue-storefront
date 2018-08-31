<template>
  <!-- Examples of usage -->
  <div>
    <button id="subscribe" @click="subscribe(email)">Subscribe to newsletter</button>
    <button id="unsubscribe" @click="unsubscribe(email)">Unsubscribe from newsletter</button>
  </div>
</template>

<script>
// Just import the features that you need in the view grouped in modules
import {
  subscribe,
  unsubscribe,
  isSubscribed
} from '@vue-storefront/core/modules/newsletter/features'

export default {
  data () {
    return {
      email: 'example@vuestorefront.io'
    }
  },
  // And register them as a mixins
  mixins: [
    subscribe,
    unsubscribe,
    isSubscribed
  ]
}
</script>
