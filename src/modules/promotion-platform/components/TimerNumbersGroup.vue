<template>
  <figure class="timer-numbers-group_container">
    <div class="timer-numbers-group">
      <ul
        class="_numbers"
        :class="{transitioned: isTransitioned}"
        @animationend="onTransitionEnd"
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
      type: Number,
      required: true
    }
  },
  data () {
    return {
      oldValue: 0,
      isTransitioned: false
    }
  },
  methods: {
    onTransitionEnd () {
      this.isTransitioned = false
      this.oldValue = this.value;
    }
  },
  watch: {
    value (val, oldVal): void {
      if (val !== oldVal) {
        this.oldValue = oldVal;
        this.isTransitioned = true;
      }
    }
  }
})
</script>

<style lang="scss" scoped>

.timer-numbers-group_container {
  height: 100%;
  color: black;
  background: #fff;
  display: inline-block;
  margin: 0;
  padding: 0;

  .timer-numbers-group {
    position: relative;
    height: 100%;
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
    }

    &.transitioned {
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
