<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex">
    <!--        // Changes Vinod-->
    <img
      v-show="key > 0"
      :width="width"
      :height="height"
      :src="storeLogo"
      :key="key"
      alt="ProCC Store logo"
    >
  </router-link>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        storeLogo: 'categories/getStoreLogo'
      })
    },
    watch: {
      storeLogo: {
        handler: function (newValue, oldValue) {
          if (newValue !== '') {
            setTimeout(() => this.key++, 10)
          }
        },
        deep: true,
        immediate: true
      }
    },
    data () {
      return {
        key: 0
      }
    },
    props: {
      width: {
        type: [String, Number],
        required: true
      },
      height: {
        type: [String, Number],
        required: true
      }
    }
  }
</script>
