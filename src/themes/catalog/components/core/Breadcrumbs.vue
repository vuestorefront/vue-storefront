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
import Breadcrumbs from 'core/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs]
}
</script>
