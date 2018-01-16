<template>
  <div class="breadcrumbs">
      <span v-for="link in routes" class="c-secondary-lighter">
          {{ link.name | htmlDecode }} /
      </span>
      <span>
        {{ activeRoute | htmlDecode }}
      </span>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Breadcrumbs')]
}
</script>