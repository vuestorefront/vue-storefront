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
import breadcrumbs from 'core/components/Modal'

export default {
  mixins: [breadcrumbs]
}
</script>
