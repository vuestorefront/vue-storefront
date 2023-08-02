<template>
  <img v-if="colorMode.value === 'dark'" :src="addDarkToImagePath(src)" :alt="alt" />
  <img v-else :src="src" :alt="alt" />
</template>

<script setup>
const props = defineProps(['src','alt'])

const colorMode = useColorMode();

function addDarkToImagePath(imagePath) {
  const lastDotIndex = imagePath.lastIndexOf('.');
  const fileName = imagePath.substring(0, lastDotIndex);
  const extension = imagePath.substring(lastDotIndex + 1);
  const darkImagePath = `${fileName}_dark.${extension}`;
  return darkImagePath;
}
</script>