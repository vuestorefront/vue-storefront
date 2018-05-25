<template>
  <modal name="modal-switcher" :width="650">
    <p slot="header">
      {{ $t('Choose your country') }}
    </p>
    <div slot="content">
      <div>
        <h3>{{ config.i18n.fullCountryName }}</h3>
        <ul>
          <li><a href="/">{{ config.i18n.fullLanguageName }}</a></li>
        </ul>
      </div>
      <div v-for="(storeView, storeCode) in storeViews" :key="storeCode" v-if="!storeView.disabled && typeof storeView === 'object' && storeView.i18n">
        <h3>{{ storeView.i18n.fullCountryName }}</h3>
        <ul>
          <li><a :href="'/' + storeCode">{{ storeView.i18n.fullLanguageName }}</a></li>
        </ul>
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
  computed: {
    storeViews () {
      return config.storeViews
    },
    config () {
      return config
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-switcher')
    }
  }
}
</script>
<style lang="scss" scoped>
  h3 {
    margin-bottom: 0.5em;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: inline-block;
      + li {
        margin-left: 1em;
      }
    }
  }
</style>
