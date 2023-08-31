<template>
  <component
    :class="{
      'opacity-50': status === $site.themeConfig.STATUS.WIP,
      'hover:shadow-sm transition-all hover:border-black dark:hover:border-white  hover:-translate-y-1': status !== $site.themeConfig.STATUS.WIP,
    }"
    :is="link ? 'a' : 'div'"
    :href="link ? (typeof link === 'string' ? link : link[0].link) : ''"
    class="overflow-hidden bg-white dark:bg-zinc-900 relative flex flex-col pb-0 pt-6 whitespace-normal rounded p-4 border dark:border-zinc-700"
  >
    <div
      class="px-2 py-1 text-xs rounded-bl absolute top-0 right-0 flex items-center"
      :class="{
        'bg-green text-white': license === $site.themeConfig.LICENSE.ENTERPRISE,
        'bg-slate-200 dark:bg-zinc-800': license !== $site.themeConfig.LICENSE.ENTERPRISE,
      }"
    >
      {{ license }}
    </div>
    <div class="flex items-center mb-4">
      <div class="flex shrink-0 items-center justify-center w-12 h-12 p-1 mr-2 bg-gray-100 rounded">
        <img
          :src="`/v2/integrations-logos/thumbnails/${name
            .toLowerCase()
            .replace(/ - magento/g, '')
            .replace(/ - commercetools/g, '')
            .replace(/ /g, '-')
            .replace(/\./g, '-')}.png`"
          class="object-contain w-full h-8 p-1"
          :alt="name"
        />
      </div>
      <div class="flex flex-col flex-1">
        <div>
          <span class="font-medium text-black dark:text-white">{{ name }}</span>
        </div>
      </div>
    </div>
    <div v-if="isCommunityMaintained || (link && typeof link !== 'string')" class="mb-4">
      <p v-if="isCommunityMaintained" class="text-sm">Maintained by {{ maintainedBy[0]?.name }}</p>
      <p class="mt-4 text-sm" v-if="link && typeof link !== 'string'">Compatible with {{ link.map((val) => val?.name).join(' and ') }}</p>
    </div>
    <div class="tile-info mb-4 mt-auto">
      <div class="flex flex-wrap justify-start gap-2 tile-badges items-top mt-2">
        <div
          class="px-2 py-1 text-xs rounded border border-purple text-purple dark:border-purple-200 dark:text-purple-200"
          v-if="maintainedBy[0]?.name !== 'Vue Storefront'"
        >
          Community Maintained
        </div>
        <div class="px-2 py-1 text-xs rounded border border-green text-green" v-else>VSF Maintained</div>

        <div
          class="py-1 px-2 text-xs rounded border dark:border-zinc-700"
          :class="{
            'bg-gray-300 text-black': status === $site.themeConfig.STATUS.WIP,
          }"
          v-if="status !== $site.themeConfig.STATUS.STABLE"
        >
          {{ status === $site.themeConfig.STATUS.BETA ? 'Beta' : 'In Development' }}
        </div>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'IntegrationTile',
  props: {
    minimized: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: [String, Array],
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    maintainedBy: {
      type: Array,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
  },

  computed: {
    isCommunityMaintained() {
      return this.maintainedBy[0] && this.maintainedBy[0]?.name !== 'Vue Storefront'
    },
    statusClass() {
      const [key] = Object.entries(this.$site.themeConfig.STATUS).find(([_, value]) => value === this.status);

      return `tile-status-${key.toLowerCase()}`;
    },

    licenseClass() {
      const [key] = Object.entries(this.$site.themeConfig.LICENSE).find(([_, value]) => value === this.license);

      return `tile-license-${key.toLowerCase()}`;
    },
  },
};
</script>
