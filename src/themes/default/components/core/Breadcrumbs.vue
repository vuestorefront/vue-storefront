<template>
  <div class="breadcrumbs h5 cl-gray">
    <span v-for="link in routes" :key="link.route_link">
      <router-link :to="link.route_link">
        {{ link.name | htmlDecode }}
      </router-link> /
    </span>
    <span class="cl-mine-shaft">
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
