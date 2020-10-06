<template>
  <div
    class="sf-radio"
    :class="{
      'is-active': isChecked,
      'is-disabled': disabled,
    }"
  >
    <label class="sf-radio__container">
      <input
        v-focus
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @input="inputHandler"
      />
      <!-- @slot Custom checkmark markup (bind 'isChecked' boolean, 'disabled' boolean -->
      <slot name="checkmark" v-bind="{ isChecked, disabled }">
        <div
          class="sf-radio__checkmark"
          :class="{ 'sf-radio__checkmark is-active': isChecked }"
        ></div>
      </slot>
      <div class="sf-radio__content">
        <!-- @slot Custom label markup (bind 'label' string, 'isChecked' boolean, 'disabled' boolean -->
        <slot name="label" v-bind="{ label, isChecked, disabled }">
          <div v-if="label" class="sf-radio__label">{{ label }}</div>
        </slot>
        <!-- @slot Custom details markup (bind 'details' string -->
        <slot name="details" v-bind="{ details }">
          <p v-if="details" class="sf-radio__details">
            {{ details }}
          </p>
        </slot>
        <!-- @slot Custom description markup (bind 'description' string -->
        <slot name="description" v-bind="{ description }">
          <p v-if="description" class="sf-radio__description">
            {{ description }}
          </p>
        </slot>
      </div>
    </label>
  </div>
</template>
<script>
import {
  focus
} from '@storefront-ui/vue/src/utilities/directives';
export default {
  name: 'SfRadio',
  directives: {
    focus
  },
  model: {
    prop: 'selected',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    details: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String,
      default: ''
    }
  },
  computed: {
    isChecked() {
      return this.value === this.selected;
    }
  },
  methods: {
    inputHandler() {
      this.$emit('input', this.value);
    }
  }
};
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/helpers";

.sf-radio {
  display: var(--radio-display, flex);
  transition: var(
    --radio-transition,
    background-color 0.25s cubic-bezier(1, 0.5, 0.8, 1)
  );
  &__label {
    display: var(--radio-label-display, flex);
    @include font(
      --radio-label-font,
      var(--font-weight--normal),
      var(--font-size--base),
      normal,
      var(--font-family--primary)
    );
    color: var(--radio-label-color);
  }
  &__checkmark {
    box-sizing: border-box;
    width: var(--radio-checkmark-size, 1.5rem);
    height: var(--radio-checkmark-size, 1.5rem);
    @include border(
      --radio-checkmark-border,
      1px,
      solid,
      var(--c-gray-variant)
    );
    border-radius: var(--radio-checkmark-border-radius, 100%);
    transition: var(
      --radio-checkmark-transition,
      border 0.25s cubic-bezier(1, 0.5, 0.8, 1)
    );
    &.is-active {
      --radio-checkmark-border-width: 9px;
      --radio-checkmark-border-color: var(--c-primary);
    }
  }
  input {
    position: absolute;
    opacity: 0;
    left: -1000%;
    width: 1px;
    height: 1px;
    &[style*="outline: none"]:focus + .sf-radio__checkmark {
      outline: none;
    }
    &:focus + .sf-radio__checkmark {
      outline-color: -webkit-focus-ring-color;
      outline-style: auto;
    }
  }
  &__container {
    position: relative;
    display: var(--radio-container-display, flex);
    align-items: var(--radio-container-align-items);
    flex: 1;
    padding: var(
      --radio-container-padding,
      var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) var(--spacer-sm)
    );
    cursor: var(--radio-container-cursor, pointer);
  }
  &:hover {
    --radio-checkmark-border-color: var(--c-black);
  }
  &__content {
    flex: 1;
    margin: var(--radio-content-margin, 0 0 0 var(--spacer-sm));
  }
  &__details {
    margin: var(--radio-details-margin, var(--spacer-xs) 0 0 0);
    color: var(--radio-details-color, var(--c-text-muted));
    @include font(
      --radio-details-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.2,
      var(--font-family--primary)
    );
  }
  &__description {
    margin: var(--radio-description-margin, var(--spacer-xs) 0 0 0);
    @include font(
      --radio-description-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    color: var(--radio-description-margin);
  }
  &.is-active {
    background: var(--radio-background, var(--c-light));
  }
  &.is-disabled {
    --radio-checkmark-border-color:  var(--c-text-disabled);
    --radio-details-color: var(--c-text-disabled);
    --radio-description-margin: var(--c-text-disabled);
    --radio-label-color: var(--c-text-disabled);
    --radio-container-cursor: default;
    &:hover {
      --radio-checkmark-border-color: var(--c-text-disabled);
    }
  }
  &--transparent {
    &.is-active {
      --radio-background: transparent;
    }
  }
  @include for-desktop {
    --radio-container-padding: var(--spacer-sm);
  }
}
</style>
