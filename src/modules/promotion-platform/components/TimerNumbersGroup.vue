<template>
  <figure class="timer-numbers-group_container">
    <div class="timer-numbers-group">
      <ul
        class="_numbers"
        :class="{animated: isAnimated}"
        @animationend="onAnimationEnd"
      >
        <li class="_number-item">
          {{ value }}
        </li>
        <li class="_number-item">
          {{ oldValue }}
        </li>
      </ul>
    </div>
  </figure>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      oldValue: '0',
      isAnimated: false
    }
  },
  methods: {
    onAnimationEnd () {
      this.isAnimated = false
      this.oldValue = this.value;
    }
  },
  watch: {
    value (val, oldVal): void {
      if (val !== oldVal) {
        this.oldValue = oldVal;
        this.isAnimated = true;
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$default-numbers-color: #535353;

.timer-numbers-group_container {
  height: 100%;
  color: black;
  background: #fff;
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  .timer-numbers-group {
    position: relative;
    height: 100%;
    color: $default-numbers-color;
    color: var(--numbers-color);
  }

  ._numbers {
    list-style-type: none;
    margin: 0;
    padding: 0;
    transform: translateY(-100%);
    height: 100%;

    ._number-item {
      margin: 0;
      padding: 0;
      list-style: none;
      text-align: center;
      width: 100%;
      height: 100%;
      line-height: 100%;
    }

    &.animated {
      animation: slide 400ms linear;
    }
  }
}

@keyframes slide {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}
</style>
