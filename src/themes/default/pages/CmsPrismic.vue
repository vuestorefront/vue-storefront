<template>
  <div class="container">
    <h2>
      Cms prismic content
    </h2>
    <cms-by-id :content-id="'XBelRhUAACkAX5tI'"/>
    <hr>
    <!-- <cms-by-type :type="'cms_page'"/>-->
  </div>
</template>
<script>

import CmsById from '../components/core/blocks/Prismic/ContentId'
// import CmsByType from '../components/core/blocks/Prismic/ContentType'

export default {
  asyncData ({ store }) {
    return new Promise((resolve, reject) => {
      store.dispatch('prismic/load', {
        contentId: 'XBelRhUAACkAX5tI'
      }).then(() => {
        resolve()
      })
    })
  },
  components: {
    CmsById
    // CmsByType
  }
}
</script>
