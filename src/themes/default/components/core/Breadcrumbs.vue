<template>
  <div class="breadcrumbs h5 cl-accent">
    <span v-for="link in routes" :key="link.route_link">
      <router-link :to="link.route_link">
        {{ link.name | htmlDecode }}
      </router-link> /
    </span>
    <strong>
      {{ activeRoute | htmlDecode }}
    </strong>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('Breadcrumbs')]
}
</script>
