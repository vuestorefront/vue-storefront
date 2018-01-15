<template>
    <button class="p0 b" :class="{ 'c-primary active': active, 'c-secondary-lighter' : !active }">
        {{ size }}
    </button>
</template>

<script>
export default {
  props: {
    size: { type: String, required: true },
    active: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';

button {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-color: $c-border;
  background: transparent;
}

button.active {
  border-color: $c-text-primary;
}
</style>