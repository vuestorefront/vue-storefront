<template>
  <layout id="cms-page" :headline="content.headline">
    <h2 v-html="content.quickHelp.headline" />
    <ul class="t-list-disc t-ml-5">
      <li v-for="question in content.quickHelp.questions" :key="question.text">
        <router-link :to="localizedRoute(question.link)" class="t-flex t-mb-2 t-text-base-tone">
          {{ question.text }}
        </router-link>
      </li>
    </ul>
    <h2 v-html="content.serviceTeam.headline" />
    <div class="t-flex t-flex-wrap t--mx-2">
      <div v-for="member in content.serviceTeam.team" :key="member.name" class="t-w-full sm:t-w-1/2 md:t-w-1/3 xl:t-w-1/4 t-px-2 t-pb-4">
        <div class="t-relative t-border t-border-base-light">
          <div v-html="member.name" class="t-absolute t-b t-bg-gray t-left-0 t-mr-4 t-px-3 t-py-2 t-text-sm t-top-0 t-text-white t-bg-base-light" />
          <img :src="getMediaThumbnail(member.img, 0, 0)" :alt="member.name">
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Page from 'icmaa-cms/components/Page'
import Layout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Layout'

export default {
  name: 'Service',
  mixins: [ Page ],
  components: {
    Layout
  },
  data () {
    return {
      dataType: 'yaml'
    }
  },
  asyncData ({ store }) {
    return store.dispatch('icmaaCmsBlock/single', { value: 'service-navigation' })
  }
}
</script>
