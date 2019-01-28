<template>
  <div class="container">
    <h2>
      Cms prismic content
    </h2>
    <cms-by-id :content-id="'XBelRhUAACkAX5tI'"/>
    <hr>
    <cms-by-type :type="'cms_page'"/>
  </div>
</template>
<script>

import CmsById from '../components/core/blocks/Prismic/ContentId'
import CmsByType from '../components/core/blocks/Prismic/ContentType'

export default {
  components: {
    CmsById,
    CmsByType
  }
}
</script>
