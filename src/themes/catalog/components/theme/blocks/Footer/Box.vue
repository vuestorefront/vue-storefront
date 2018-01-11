<template>
  <div class="box row middle-xs">
    <div class="col-md-4 center-xs">
        <div class="inline-flex icon-with-bg p20">
            <div class="material-icons">{{ icon }}</div>
        </div>
    </div>
    <div class="col-md-8">
        <h4 class="flex semibold uppercase c-secondary-lighter my0">{{ title}}</h4>
        <span class="flex fs-large semibold c-primary">{{ content }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      icon: { type: String, required: true }
    }
  }
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';
@import '~theme/css/mixins/transitions';

.box {
    .icon-with-bg, span {
        @include transition;
    }
}
.box:hover {
    .icon-with-bg {
        background: $c-accent;
    }
    span {
        color: $c-accent;
    }
}
</style>
