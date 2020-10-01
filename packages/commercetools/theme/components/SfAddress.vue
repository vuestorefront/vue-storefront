<template>
  <SfRadio v-model="selected" class="sf-address" :value="name" name="groupName">
    <template #label>
      <!--@slot Default. Here you should pass address details-->
      <slot />
    </template>
    <template #checkmark>
      <!--@slot Icon. Here you can change default checkmark -->
      <slot name="icon">
        <div class="sf-address__icon-container">
          <SfIcon icon="check" class="sf-address__icon" />
        </div>
      </slot>
    </template>
  </SfRadio>
</template>
<script>
import {
  SfIcon
} from '@storefront-ui/vue';
import SfRadio from '~/components/SfRadio.vue';

export default {
  name: 'SfAddressPicker',
  components: {
    SfRadio,
    SfIcon
  },
  props: {

    /**
     * Name for address.
     * Each address should have different name.
     * For example "first", "second", "default".
     */
    name: {
      type: String,
      default: ''
    }
  },
  inject: ['getSelectedValue', 'setSelectedValue'],
  computed: {
    selected: {
      get() {
        return this.getSelectedValue();
      },
      set(newValue) {
        this.setSelectedValue(newValue);
      }
    }
  }
};
</script>
