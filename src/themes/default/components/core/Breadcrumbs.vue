<template>  
  <div class="breadcrumbs h5 weight-200 clr-mediumgray">
      <a v-for="link in routes" :href="link.route_link">
        {{ link.name }} /
      </a>
      <strong>
        {{ activeRoute }}
      </strong>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Breadcrumbs')]
}
</script>

<style scoped>
  
</style>
