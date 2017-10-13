<template>  
  <div class="breadcrumbs h5 c-darkgray">
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
