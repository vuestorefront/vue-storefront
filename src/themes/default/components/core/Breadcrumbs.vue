<template>  
  <div class="breadcrumbs h5 c-darkgray">
      <span v-for="link in routes">
        <a :href="link.route_link">
          {{ link.name }}
        </a> / 
      </span>
      <span>
        {{ activeRoute }}
      </span>
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
