<template>
  <div class="breadcrumbs">
    <span v-for="(link, index) in routes" :key="index" class="c-secondary-lighter">
      {{ link.name | htmlDecode }} /
    </span>
    <span>
      {{ activeRoute | htmlDecode }}
    </span>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('Breadcrumbs')]
}
</script>
