<template>
  <div class="breadcrumbs">
      <span v-for="link in routes">
          {{ link.name }} /
      </span>
      <strong>
        {{ activeRoute }}
      </strong>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbs',
  props: ['routes', 'activeRoute']
}
</script>