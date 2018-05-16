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
import Breadcrumbs from 'core/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs]
}
</script>
