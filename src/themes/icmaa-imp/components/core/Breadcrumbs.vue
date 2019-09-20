<template>
  <div class="t-text-sm t-text-base-tone">
    <template v-for="(link, index) in routes">
      <router-link :to="link.route_link" :key="index">
        {{ link.name | htmlDecode }}
      </router-link>
      <span class="t-mx-2" :key="'bullet-' + index" v-text="spacerCharacter" />
    </template>
    <span v-text="activeRoute || htmlDecode" />
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'
export default {
  mixins: [Breadcrumbs],
  props: {
    spacerCharacter: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>
