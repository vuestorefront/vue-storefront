<template>
  <div id="cms-page">
    <header class="bg-cl-secondary py35 pl20">
      <div class="container">
        <div class="row middle-sm">
          <h1 class="col-sm-9 category-title mb10">
            {{ cmsPageContent.title }}
          </h1>
        </div>
      </div>
    </header>
    <div class="container pb60" v-html="cmsPageContent.content" />
  </div>
</template>

<script>
import CmsPage from '@vue-storefront/core/pages/CmsPage'

export default {
  computed: {
    cmsPageContent () {
      if (this.$store.state.cmsPage.current) {
        return this.$store.state.cmsPage.current
      }

      Logger.error('Current CMS page could not be loaded from Vuex', '$store.state.cmsPage.current')()

      return {}
    }
  },
  mixins: [CmsPage]
}
</script>
