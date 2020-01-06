<template>
  <modal name="modal-switcher" :width="650">
    <p slot="header">
      {{ $t('Choose your country') }}
    </p>
    <div slot="content">
      <div :class="{ 'columns': enableColumns }">
        <div class="country country-current">
          <h3>{{ $t(fullCountryName) }}</h3>
          <ul>
            <li><a href="/">{{ $t(fullLanguageName) }}</a></li>
          </ul>
        </div>
        <div class="country country-available" v-for="(storeView, storeCode) in storeViews" :key="storeCode">
          <h3>{{ $t(storeView.i18n.fullCountryName) }}</h3>
          <ul>
            <li><a :href="storeView.url">{{ $t(storeView.i18n.fullLanguageName) }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import Modal from 'theme/components/core/Modal.vue'
import config from 'config'
export default {
  components: {
    Modal
  },
  data () {
    return {
      minCountryPerColumn: 3,
      componentLoaded: false
    }
  },
  computed: {
    fullCountryName () {
      return config.i18n.fullCountryName
    },
    fullLanguageName () {
      return config.i18n.fullLanguageName
    },
    enableColumns () {
      const enableStoreViews = Object.keys(this.storeViews)
      return enableStoreViews.length > this.minCountryPerColumn
    },
    storeViews () {
      return Object.keys(config.storeViews).reduce((storeViews, storeCode) => {
        if (this.isValidStoreCode(storeCode)) {
          storeViews[storeCode] = config.storeViews[storeCode]
        }
        return storeViews
      }, {})
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
      this.$bus.$emit('modal-show', 'modal-switcher')
    })
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-switcher')
    },
    isValidStoreCode (storeCode) {
      const storeView = config.storeViews[storeCode]
      return !!(storeView && typeof storeView === 'object' && storeView.i18n)
    }
  }
}
</script>
<style lang="scss" scoped>
  h3 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .columns {
    -moz-column-count: 2;
    column-count: 2;
    column-gap: 15px;
    .country {
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
  .country {
    margin-bottom: 2em;
    color: #4f4f4f;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-left: -1em;
    li {
      display: inline-block;
      margin-left: 1em;
      a {
        font-size: 0.9em;
      }
    }
  }
</style>
