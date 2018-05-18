<template>
  <div class="compare-icon" v-if="isActive">
    Core Compare Icon
    <router-link to="/compare">compare</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CompareIcon',
  props: {
    product: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('compare', [
      'isActive'
    ])
  }
}
</script>
