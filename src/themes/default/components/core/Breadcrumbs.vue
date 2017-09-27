<template>  
  <div class="breadcrumbs h5">
      <span v-for="link in routes">
        {{ link.name }} /
      </span>
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
  .breadcrumbs {
    color: #828282;
    font-weight: 200;
  }
</style>
