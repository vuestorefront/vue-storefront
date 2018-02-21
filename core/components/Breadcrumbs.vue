<template>
  <div class="breadcrumbs">
    <span v-for="(link, index) in routes" :key="index">
      {{ link.name | htmlDecode }} /
    </span>
    <strong>
      {{ activeRoute | htmlDecode }}
    </strong>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    routes: {
      type: Array,
      required: true
    },
    activeRoute: {
      type: String,
      required: true
    }
  }
}
</script>
