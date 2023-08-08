<template>
<div>
  <iframe :src="config" width="100%" height="100%" fetchpriority="low"></iframe>
</div>
</template>

<script setup>
defineProps(['config'])
</script>