<template>
  <div class="storyblok-editor-block-icons" v-if="showIcons">
    <div class="_icons">
      <div
        class="_icon-item"
        :class="icon.classes"
        v-for="icon in iconsList"
        :key="icon.id"
        :title="icon.title"
      >
        <img :src="icon.iconSrc" class="_icon-image">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import desktopOnlyIcon from '../../assets/icons/desktop-only.svg';
import mobileOnlyIcon from '../../assets/icons/mobile-only.svg';
import { getStoryblokQueryParams } from '../../helpers'
import ItemData from '../../types/item-data.interface'
import { Display } from '../../types/display.value';

interface IconItem {
  id: string,
  iconSrc: string,
  classes: string[],
  title: string
}

export default Vue.extend({
  name: 'StoryblokEditorBlockIcons',
  props: {
    item: {
      type: Object as PropType<ItemData>,
      required: true
    }
  },
  computed: {
    isStoryblokPreview (): boolean {
      const { id } = getStoryblokQueryParams(this.$route)
      return !!id
    },
    displayIconItem (): IconItem | undefined {
      switch (this.item.display) {
        case Display.MOBILE_HIDDEN:
          return {
            id: Display.MOBILE_HIDDEN,
            iconSrc: desktopOnlyIcon,
            classes: ['desktop-only'],
            title: 'Desktop Only'
          }
        case Display.MOBILE_ONLY:
          return {
            id: Display.MOBILE_ONLY,
            iconSrc: mobileOnlyIcon,
            classes: ['mobile-only'],
            title: 'Mobile Only'
          }
        default:
          return undefined;
      }
    },
    iconsList (): IconItem[] {
      if (!this.displayIconItem) {
        return [];
      }

      return [this.displayIconItem];
    },
    showIcons (): boolean {
      return !!this.iconsList.length && this.isStoryblokPreview;
    }
  }
})
</script>

<style lang="scss" scoped>
.storyblok-editor-block-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    ._icons {
      padding-left: 5px;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      z-index: 3;

      ._icon-item {
        padding: 0.5rem;
        width: 1rem;
        height: 1rem;
        background-color: #00b3b0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }
}
</style>
