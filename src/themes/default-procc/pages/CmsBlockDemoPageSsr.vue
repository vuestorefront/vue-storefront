<template>
  <div class="container">
    <h2>
      Cms page content ssr
    </h2>
    <cms-block :identifier="'footer_about_menu'" />
    <cms-block :identifier="'no_reviews___'" />
    <!-- <cms-block :id="29"/> -->
  </div>
</template>
<script>

import CmsBlock from '../components/core/blocks/Cms/Block'

export default {
  components: {
    CmsBlock
  },
  mixins: [CmsBlock]
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-secondary: color(secondary);

.cms-content {
  & * {
    font-size: 18px;
  }

  a {
    color: $color-secondary;
    text-decoration: underline;
  }

}
</style>
