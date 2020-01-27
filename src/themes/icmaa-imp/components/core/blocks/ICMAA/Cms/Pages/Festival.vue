<template :class="content.backgroundcolor">
  <layout id="festival" :headline="content.headline">
    <div class="t-bg-festival-container">
      <!-- Header -->
      <div>
        <router-link :to="content.header.link">
          <img :src="getMediaThumbnail(content.header.img, 0, 0)" :alt="content.header.alt" :title="content.header.alt">
        </router-link>
      </div>

      <!-- Cities -->
      <ul class="t-flex t-justify-center t-mt-4 t-bg-festival">
        <li class="city-item" v-for="(city, index) in content.cities" :key="index" @click="currentTab = index" :class="{active: currentTab === index}">
          <router-link :to="'#' + city.name" class="t-text-white t-block t-m-5 t-uppercase t-text-xl">
            {{ city.name }}
          </router-link>
        </li>
      </ul>

      <div class="tab-content">
        <div v-for="(city, index) in content.cities" :key="index" :class="{active: currentTab === index}" v-show="currentTab === index">
          <router-link :to="city.link">
            <img :src="getMediaThumbnail(city.img, 0, 0)" :alt="city.name" :title="city.name">
          </router-link>
        </div>
      </div>

      <!-- Extras -->
      <div class="t-mt-8">
        <router-link :to="content.extra.link">
          <img :src="getMediaThumbnail(content.extra.img, 0, 0)" :alt="content.extra.alt" :title="content.extra.alt">
        </router-link>
      </div>
      <!-- Video -->
      <div class="t-container t-w-full">
        <h2 class="t-text-white t-text-center t-text-4xl t-my-4" v-html="content.video.headline" />
        <div class="t-relative t-w-full t-bg-white" style="padding-top: 56.25%">
          <iframe class="t-absolute t-top-0" width="100%" height="100%" :src="content.video.link" frameborder="0" allowfullscreen />
        </div>
      </div>

      <!-- Sponsors -->
      <div class="t-flex t-justify-center t-flex t-flex-wrap">
        <div v-for="sponsor in content.sponsors" :key="sponsor.name" class="t-block t-my-6">
          <a :href="sponsor.link">
            <img :src="getMediaThumbnail(sponsor.img, 0, 0)" :alt="sponsor.name" :title="sponsor.name" width="120">
          </a>
        </div>
      </div>

      <!-- Press -->
      <div class="t-flex t-justify-center">
        <a :href="content.press.link">
          <button-component type="primary" size="sm" class="t-w-full t-my-6 t-block t-bg-festival t-text-white t-px-4 t-py-2">
            {{ content.press.button }}
          </button-component>
        </a>
      </div>

      <!-- Gallery-->
      <div class="t-flex t-flex-wrap">
        <img v-for="galleryitem in content.gallery" :key="galleryitem.name" :src="getMediaThumbnail(galleryitem.img, 0, 0)" :alt="galleryitem.name" :title="galleryitem.name" class="t-w-1/2 md:t-w-1/3 lg:t-w-1/6">
      </div>
      </div>
  </layout>
</template>

<script>
import Page from 'icmaa-cms/components/Page'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'Festival',
  mixins: [ Page ],

  data () {
    return {
      dataType: 'yaml',
      currentTab: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.t-bg-festival-container {
  background-color: #e0d8c3
}

.t-bg-festival {
  background-color: #3d0c0b
}
</style>
