<template>
  <div
    class="base-image sf-image"
    :class="[
      {
        '-with-placeholder': hasPlaceholder,
        '-loading': !isLoaded,
      },
      componentClass,
      objectFitClass
    ]"
    :style="componentStyles"
    v-on="$listeners"
  >
    <component :is="'style'" type="text/css" v-if="placeholderPaddings.length">
      <template v-for="item in placeholderPaddings">
        @media (max-width: {{ item.breakpoint }}px) {
        .base-image.{{ componentClass }} ._placeholder[{{ cssScopeId }}] {
        padding-top: {{ item.padding }};
        }
        }
      </template>
    </component>

    <div class="_placeholder" />

    <div class="_image-wrapper">
      <picture>
        <source
          v-for="source of sortedSources"
          :key="source.breakpoint"
          :srcset="source.srcset.join(', ')"
          :media="getMediaQuery(source.breakpoint)"
        >
        <img
          v-show="defaultSrc"
          :src="defaultSrc"
          :srcset="defaultSrcSet"
          v-bind="$attrs"
          :width="width"
          :loading="lazy ? 'lazy' : 'eager'"
          @load="onLoad"
        >
      </picture>

      <div v-if="hasOverlay" class="sf-image__overlay">
        <slot />
      </div>

      <noscript inline-template>
        <img
        :src="defaultSrc"
        :srcset="defaultSrcSet"
        class="sf-image sf-image-loaded"
        v-bind="$attrs"
        :width="width"
        />
      </noscript>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PropType } from 'vue/types/options';

import ImageAspectRatioSpec from '../types/image-aspect-ratio-spec.interface';
import ImageSourceItem from '../types/image-source-item.interface';

interface PaddingSpec {
  breakpoint: number,
  padding: string
}

let instanceId = 0;

export default Vue.extend({
  name: 'BaseImage',
  inheritAttrs: false,
  props: {
    src: {
      type: String as PropType<string | undefined>,
      default: undefined
    },
    aspectRatio: {
      type: Number as PropType<number | undefined>,
      default: undefined
    },
    srcsets: {
      type: Array as PropType<ImageSourceItem[]>,
      default: () => []
    },
    lazy: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: null
    },
    objectFit: {
      type: String as PropType<'contain' | 'cover'>,
      default: 'contain'
    }
  },
  data () {
    return {
      isLoaded: false,
      instanceId: ''
    };
  },
  created: function (): void {
    this.instanceId = instanceId.toString();
    instanceId += 1;
  },
  computed: {
    componentClass (): string {
      return 'base-image-' + this.instanceId;
    },
    cssScopeId (): string {
      return (this.$options as any)._scopeId;
    },
    componentStyles (): Record<string, string> {
      const result: Record<string, string> = {};

      if (this.optimizedAspectRatiosList.length === 1) {
        const paddingPercent = 1 / this.optimizedAspectRatiosList[0].aspectRatio * 100;
        result['--image-block-height'] = paddingPercent.toFixed(2) + '%';
      }

      result['--image-width'] = '100%';
      if (this.width) {
        result['--image-width'] = this.width.toString();
      }

      return result; ;
    },
    hasPlaceholder (): boolean {
      return this.optimizedAspectRatiosList.length > 0;
    },
    sortedSources (): ImageSourceItem[] {
      return [...this.srcsets].sort((a, b) => a.breakpoint - b.breakpoint)
    },
    defaultSrcSet (): string[] | undefined {
      if (!this.sortedSources.length) {
        return undefined;
      }

      return this.sortedSources.slice(-1)[0].srcset;
    },
    defaultSrc (): string | null {
      if (this.src) {
        return this.src;
      }

      if (!this.defaultSrcSet) {
        return null;
      }

      return this.defaultSrcSet[0];
    },
    objectFitClass (): string {
      return `-${this.objectFit}`;
    },
    optimizedAspectRatiosList (): ImageAspectRatioSpec[] {
      const result: ImageAspectRatioSpec[] = [];

      if (!this.sortedSources.length && !this.aspectRatio) {
        return result;
      }

      if (!this.sortedSources.length && this.aspectRatio) {
        result.push({
          breakpoint: 9999,
          aspectRatio: this.aspectRatio
        });
        return result;
      }

      let item: ImageAspectRatioSpec | undefined;

      for (const source of this.sortedSources) {
        if (item && item.aspectRatio === source.aspectRatio) {
          item.breakpoint = source.breakpoint;
          continue;
        }

        item = {
          breakpoint: source.breakpoint,
          aspectRatio: source.aspectRatio
        }

        result.push(item);
      }

      return result;
    },
    placeholderPaddings (): PaddingSpec[] {
      const result: PaddingSpec[] = [];

      if (this.optimizedAspectRatiosList.length <= 1) {
        return result;
      }

      // Since we use max-width queries we want most specific rules in CSS
      // be the last ones to have more weight
      const breakpointsFromMaxToMin = [...this.optimizedAspectRatiosList].sort(
        (a, b) => b.breakpoint - a.breakpoint
      );

      for (const item of breakpointsFromMaxToMin) {
        const paddingPercent = 1 / item.aspectRatio * 100;

        result.push({
          breakpoint: item.breakpoint,
          padding: paddingPercent.toFixed(2) + '%'
        });
      }

      return result;
    },
    hasOverlay (): boolean {
      return !!this.$slots.default;
    }
  },
  methods: {
    getMediaQuery (breakpoint: number): string | undefined {
      return `(max-width: ${breakpoint}px)`;
    },
    onLoad (): void{
      this.isLoaded = true;
    }
  },
  mounted () {
  }
});
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/atoms/SfImage.scss";
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.base-image {
  display: inline-block;
  position: relative;
  width: var(--image-width, 100%);
  max-width: 100%;

  picture {
   display: block;
   height: 100%;

      img {
        height: 100%;
        object-position: top;
      }
  }

  ._placeholder {
    display: none;
  }

  ._image-wrapper {
    height: 100%;
  }

  &.-with-placeholder {
    ._image-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    ._placeholder {
      display: block;
      background-color: transparent;
      padding-top: var(--image-block-height, 0);
    }

    &.-loading {
      ._placeholder {
        background-color: #fafafa;
      }
    }
  }

  &.-contain {
    img {
      object-fit: contain;
    }
  }

  &.-cover {
    max-height: 100%;

    img {
      object-fit: cover;
    }
  }
}
</style>
