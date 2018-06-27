<template>
  <div class="container">
    <h1>Cms content</h1>

    <h2>Cms page content</h2>
    <cms-data :id="5" :type="'Page'"/>

    <h2>Cms block content</h2>
    <cms-data :id="2" :type="'Block'"/>
  </div>
</template>

<script>
import CmsData from 'src/extensions/cms/components/CmsData'

export default {
  components: {
    CmsData
  }
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
