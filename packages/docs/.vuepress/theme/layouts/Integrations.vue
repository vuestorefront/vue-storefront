<template>
  <Fullscreen>
    <div class="prose pt-8 container relative mx-auto max-w-7xl gap-y-16">
      <Content slot-key="header" />
    </div>
    <div class="mt-12 pt-6 bg-gray-50 dark:bg-zinc-800">
      <div class="container relative mx-auto max-w-7xl gap-y-16 grid grid-cols-12 lg:gap-8">
        <aside class="hidden lg:block lg:col-span-3 relative">
          <nav class="sticky top-32 mt-9 custom-block text-black dark:text-white text-sm flex flex-col">
            <p class="font-semibold">Categories</p>
            <a href="#ecommerce-platforms" class="mt-4 opacity-60 hover:opacity-100 transition-opacity">Ecommerce Platforms</a>
            <a
              v-for="category in $site.themeConfig.CATEGORY"
              class="mt-4 opacity-60 hover:opacity-100 transition-opacity"
              :href="`#${category.toLowerCase()}`"
              >{{ category }}</a
            >
          </nav>
          <!-- {{ $site.themeConfig.CATEGORY }} -->
        </aside>
        <div class="col-span-12 lg:col-span-9 prose">
          <Content />
        </div>
      </div>
    </div>
  </Fullscreen>
</template>

<script></script>

<style scoped>
:deep(.header-anchor svg) {
  display: none;
}
</style>
