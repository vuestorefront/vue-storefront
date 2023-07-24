<template>
  <img v-if="colorMode.value === 'dark'" :src="addDarkToImagePath(src)" :alt="alt" />
  <img v-else :src="src" :alt="alt" />
</template>

<script setup>
const props = defineProps(['src','alt'])

const colorMode = useColorMode();

function addDarkToImagePath(imagePath) {
  const parts = imagePath.split('.');
  const extension = parts.pop();
  const darkImagePath = `${parts.join('.')}_dark.${extension}`;
  return darkImagePath;
}
</script>