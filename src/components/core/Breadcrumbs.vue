<template>
  <div class="breadcrumbs">
      <span v-for="link in routes">
          {{ link.name | htmlDecode }} /
      </span>
      <strong>
        {{ activeRoute | htmlDecode }}
      </strong>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbs',
  props: ['routes', 'activeRoute']
}
</script>
