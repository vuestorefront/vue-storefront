<template>
  <div
    class="page-section"
    :class="cssClasses"
    :style="styles"
  >
    <div class="_items_wrapper">
      <div
        v-for="_item in item.items"
        :key="_item.uuid"
        class="_item"
      >
        <sb-render class="box" :item="_item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Blok } from '..'

export default Blok.extend({
  name: 'StoryblokPageSection',
  computed: {
    extraCssClasses (): string[] {
      const result: string [] = [];

      if (this.item.width === 'narrow') {
        result.push('-narrow');
      }

      return result;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.page-section {
  $default-grid-gap: 10px;
  padding: $default-grid-gap * 3 $default-grid-gap;

  > ._items_wrapper {
    max-width: 960px;

    margin-left: auto;
    margin-right: auto;
  }

  @include display-property-handling;
}
</style>
