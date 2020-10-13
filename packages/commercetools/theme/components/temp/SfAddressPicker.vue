<template>
  <div class="sf-address-picker">
    <!--@slot Default. Here you should pass your addresses-->
    <slot />
  </div>
</template>
<script>
import SfAddress from '~/components/temp/SfAddress.vue';

import Vue from 'vue';
Vue.component('SfAddress', SfAddress);
export default {
  name: 'SfAddressPicker',
  props: {
    value: {
      type: String | Number,
      default: ''
    }
  },
  data() {
    return {
      checked: this.value
    };
  },
  provide() {
    return {
      getSelectedValue: this.getSelectedValue,
      setSelectedValue: this.setSelectedValue
    };
  },
  methods: {
    getSelectedValue() {
      return String(this.checked);
    },
    setSelectedValue(newVal) {
      const newValue = newVal;
      this.checked = newValue;
      this.$emit('input', Number(newValue));
    }
  }
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/helpers";

.sf-address {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--c-light);
  transition: border 150ms linear;
  @include font(
    --address-font,
    var(--font-weight--normal),
    var(--font-size--base),
    1.6,
    var(--font-family--primary)
  );
  color: var(--c-link);
  span {
    display: block;
  }
  &__icon-container {
    width: 1.5rem;
    height: 1.5rem;
    background:  transparent;
    position: absolute;
    right: var(--spacer-sm);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 150ms linear;
  }
  &__icon {
    --icon-color: var(--c-white);
    --icon-size: 0.875rem;
  }
  &.sf-radio {
    --radio-content-margin: 0;
    &--is-active {
      --radio-background: transparent;
    }
    input {
      &[style*="outline: none"]:focus + .sf-address__icon-container {
        outline: none;
      }
      &:focus + .sf-address__icon-container {
        outline-color: -webkit-focus-ring-color;
        outline-style: auto;
      }
    }
  }
  &.is-active {
    border: 1px solid var(--c-primary);
    --icon-color: var(--c-white);
    --radio-background: var(--c-white);
    .sf-address__icon-container {
      background: var(--c-primary);
    }
  }
  @include for-desktop {
    width: 23.375rem;
  }
}
</style>
