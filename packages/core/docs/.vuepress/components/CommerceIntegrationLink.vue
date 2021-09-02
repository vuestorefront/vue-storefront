<template>
  <span v-if="url === wipValue" class="integration--wip">
    {{ label }} <Badge text="WIP" type="info" />
  </span>
  <router-link :to="url" v-else>
    {{ label }} <Badge v-if="badge" :text="badge" type="info" />
  </router-link>
</template>

<script>
export default {
  props: {
    url: {
      required: true
    },
    label: {
      required: true
    },
    wipValue: {
      required: true
    },
    badge: String
  },
};
</script>

<style scoped>
  .integration--wip {
    opacity: .4;
    cursor: not-allowed;
  }
</style>