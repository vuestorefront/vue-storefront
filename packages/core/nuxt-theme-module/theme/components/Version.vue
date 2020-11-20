<template>
  <div class="version">
    v.{{ version }}
    <template v-if="lastCommit">
      (<a :href="address" target="_blank">{{ link }}</a>)
    </template>
  </div>
</template>
<script>

export default {
  setup() {
    const { version, lastCommit } = process.VERSION;
    const address = `https://github.com/DivanteLtd/next/commit/${lastCommit}`;
    const link = lastCommit.substr(0, 7);

    return {
      lastCommit,
      version,
      address,
      link
    };
  }
};
</script>

<style lang="scss">
.version {
  padding: 15px;
  font-size: 14px;
}
</style>
