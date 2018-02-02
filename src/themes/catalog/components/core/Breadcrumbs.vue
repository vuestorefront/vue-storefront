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
import { mapActions, mapState } from 'vuex'

import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Breadcrumbs')]
}
</script>