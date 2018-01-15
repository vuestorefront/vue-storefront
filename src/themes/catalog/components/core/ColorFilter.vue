<template>
    <div class="color-filter b b-circle inline-flex middle-xs center-xs" :class="{ active : active }">
        <div class="b b-circle" :style="'background-color:' + color"></div>
    </div>
</template>

<script>
export default {
  props: {
    color: { type: String, required: true },
    active: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';

.color-filter {
  width: 40px;
  height: 40px;
  border-color: transparent;
  cursor: pointer;
}
.color-filter.active {
  border-color: darken($c-border, 20%);
}
.color-filter > div {
  width: 34px;
  height: 34px;
}
</style>