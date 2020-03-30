<template>
  <div class="t-flex t-flex-wrap t-flex-fix t-content-center t-justify-center" :class="[ widthClass, { 't-mb-2': marginBottom } ]">
    <router-link v-if="!hasChildren" :to="localizedRoute(route)" :title="name | htmlDecode" class="t-cursor-pointer t-rounded-sm t-flex t-flex-wrap t-mx-1 t-w-full t-h-full t-text-center t-justify-center t-items-center t-text-sm" :class="[ icon ? 't-py-2' : 't-py-4', backgroundColorClass, textColorClass, backgroundImageClass ]" :style="[ backgroundImageStyle ]">
      <template v-if="icon">
        <material-icon v-bind="{ icon, iconSet }" size="sm" />
        <span class="t-block t-w-full t-text-xxs t-mt-1">
          {{ name }}
        </span>
      </template>
      <template v-else>
        {{ name }}
      </template>
    </router-link>
    <navigation-item v-for="(child, index) in children" v-bind="child" :level="level + 1" :key="index" />
  </div>
</template>

<script>
import NavigationItem from 'theme/components/core/blocks/SidebarMenu/NavigationItem'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'NavigationItem',
  components: {
    NavigationItem,
    MaterialIcon
  },
  props: {
    level: {
      type: Number,
      default: 0
    },
    name: {
      type: [String],
      default: ''
    },
    route: {
      type: [Object, String],
      default: ''
    },
    width: {
      type: String,
      default: '1/2'
    },
    backgroundColor: {
      type: String,
      default: 'base-lightest'
    },
    backgroundImage: {
      type: [String, Boolean],
      default: false
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    iconSet: {
      type: [String],
      default: undefined
    },
    children: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasChildren () {
      return this.children.length > 0
    },
    widthClass () {
      return 't-w-' + this.width
    },
    backgroundColorClass () {
      return 't-bg-' + this.backgroundColor
    },
    hasBackgroundImage () {
      return (this.backgroundImage)
    },
    backgroundImageStyle () {
      if (!this.hasBackgroundImage) {
        return {}
      }

      return {
        backgroundImage: 'url(' + this.getMediaThumbnail(this.backgroundImage, 0, 0) + ')',
        backgroundBlendMode: 'multiply'
      }
    },
    backgroundImageClass () {
      return this.hasBackgroundImage ? 't-bg-center t-bg-cover' : ''
    },
    marginBottom () {
      return !this.hasChildren
    },
    textColorClass () {
      return this.backgroundColor !== 'base-lightest' || this.hasBackgroundImage ? 't-text-white' : 't-text-base-dark'
    }
  }
}
</script>
