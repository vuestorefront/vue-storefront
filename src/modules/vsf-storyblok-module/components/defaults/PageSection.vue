<template>
  <div
    class="page-section"
    v-show="showPageSection"
    :class="cssClasses"
    :style="styles"
  >
    <editor-block-icons :item="itemData" />

    <div class="_items_wrapper">
      <sb-render
        v-for="(_item) in childItems"
        :key="_item._uid"
        class="box _item"
        :item="_item"
        @content-change="onChildContentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';

import { InjectType } from 'src/modules/shared';
import { Blok } from '..'
import PageSectionData from '../../types/page-section-data.interface';
import ComponentWidthCalculator from '../../component-width-calculator.service';
import { SectionWidth } from '../../types/section-width.value';

const MAX_WIDTH = 960;

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'StoryblokPageSection',
  inject: {
    componentWidthCalculator: {}
  } as unknown as InjectType<InjectedServices>,
  provide () {
    let widthCalculator = this.componentWidthCalculator;
    if (this.itemData.width === SectionWidth.NARROW) {
      widthCalculator = widthCalculator.limitSize(MAX_WIDTH);
    }
    return {
      'componentWidthCalculator': widthCalculator
    }
  },
  data () {
    let childItemsEmptyState: Record<string, boolean> = {};

    return {
      childItemsEmptyState
    }
  },
  computed: {
    showPageSection (): boolean {
      const values = Object.values(this.childItemsEmptyState);

      if (!values.length) {
        return true;
      }

      return Object.values(this.childItemsEmptyState).some((isEmpty) => !isEmpty);
    },
    childItems (): any[] {
      const result = [];
      for (const item of this.itemData.items) {
        if (!item) {
          console.warn('Warning! Component data are missing: ' + JSON.stringify(this.itemData));
          continue;
        }

        result.push(item);
      }

      return result;
    },
    itemData (): PageSectionData {
      return this.item as PageSectionData;
    },
    extraCssClasses (): string[] {
      const result: string [] = [];

      if (this.itemData.width === SectionWidth.NARROW) {
        result.push('-narrow');
      }

      return result;
    },
    extraStyles (): Record<string, string> {
      const result: Record<string, string> = {};

      if (this.itemData.width === SectionWidth.NARROW) {
        result['--max-section-width'] = MAX_WIDTH + 'px';
      }

      return result;
    }
  },
  methods: {
    onChildContentChange ({ isEmpty, itemId }: {isEmpty: boolean, itemId: string}): void {
      this.childItemsEmptyState[itemId] = isEmpty;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.page-section {
  $default-grid-gap: 1rem;

  padding: $default-grid-gap * 1.5 $default-grid-gap;

  > ._items_wrapper {
    max-width: var(--max-section-width, none);

    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: $tablet-min) {
    $default-grid-gap: 1.3rem;
    padding: $default-grid-gap * 1.5 $default-grid-gap;
  }

  @include storyblok-sub-elements-layout;
  @include display-property-handling;
}
</style>
