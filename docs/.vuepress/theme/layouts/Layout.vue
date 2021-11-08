<template>
  <!-- Google Tag Manager (noscript) -->
  <noscript>
    <iframe
      :src="`https://www.googletagmanager.com/ns.html?id=${ theme.GTM_TAG }`"
      height="0"
      width="0"
      style="display:none;visibility:hidden">
    </iframe>
  </noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <slot name="sidebar">
      <Sidebar>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </slot>

    <slot name="page">
      <Home v-if="frontmatter.home" />

      <Transition
        v-else
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <Page :key="page.path">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </Transition>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import { computed, onMounted, onUnmounted, ref, Transition } from 'vue';
import { useRouter } from 'vue-router';
import type { DefaultThemePageFrontmatter } from '@vuepress/theme-default/lib/shared';
import Home from '@vuepress/theme-default/lib/client/components/Home.vue';
import Navbar from '@vuepress/theme-default/lib/client/components/Navbar.vue';
import Page from '@vuepress/theme-default/lib/client/components/Page.vue';
import Sidebar from '@vuepress/theme-default/lib/client/components/Sidebar.vue';
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
  useThemeData
} from '@vuepress/theme-default/lib/client/composables';
const page = usePageData()
const theme = useThemeData();
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()
// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)
// sidebar
const sidebarItems = useSidebarItems()
const isSidebarOpen = ref(false)
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}
const touchStart = { x: 0, y: 0 }
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX
  touchStart.y = e.changedTouches[0].clientY
}
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x
  const dy = e.changedTouches[0].clientY - touchStart.y
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true)
    } else {
      toggleSidebar(false)
    }
  }
}
// classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !sidebarItems.value.length,
    'sidebar-open': isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
])
// close sidebar after navigation
let unregisterRouterHook
onMounted(() => {
  const router = useRouter()
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false)
  })
})
onUnmounted(() => {
  unregisterRouterHook()
})
// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>
