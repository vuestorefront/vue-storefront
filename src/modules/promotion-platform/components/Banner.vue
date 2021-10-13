<template>
  <div class="promotion-platform-countdown-banner-wrapper">
    <div class="promotion-platform-countdown-banner-container" v-if="showBanner" />
  </div>
</template>

<script lang="ts">

/*
data-countdown-date="2021-10-15 03:59:00"
data-background-color="f7acb7"
data-numbers-color="535353"
data-text-color="FFFFFF"
data-version="2021-09-13 09:39:58"
data-id="29"
class="promotion-platform-countdown-banner -visible"
style="--background-color:#f7acb7;
--numbers-color:#535353;
--text-color:#FFFFFF;"
*/
import Vue from 'vue'

export default Vue.extend({
  computed: {
    showBanner (): boolean {
      if (this.countdownDate <= new Date()) {
        return false;
      }

      return !this.isBannerWasClosedByUser;
    },
    isBannerWasClosedByUser (): boolean {
      return this.$store.getters['promotionPlatform/lastClosedByUserBannerVersion'] === this.version;
    }
  },
  data () {
    return {
      countdownDate: undefined as undefined | Date,
      version: '',
      backgroundColor: ''
    }
  },
  created () {
    // this.$store.dispatch('promotionPlatform/fetchCampaignContent');
  },
  methods: {
  }
})
</script>
