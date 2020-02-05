<template>
  <div class="t-text-white t-bg-base-dark t-p-4 md:t-p-8 lg:t-p-16 t-uppercase t-text-center t-container">
    <!-- banner -->
    <div class="t-flex t-justify-center">
      <img :src="getMediaThumbnail(content.header.img, 0, 0)" :alt="content.header.alt" :title="content.header.alt" class="t-border-b t-border-base-lightest t-mb-4 t-mt-8 t-pb-8 t-w-2/3">
    </div>

    <!-- description -->
    <div class="t-mt-4 t-mb-8">
      {{ content.description }}
    </div>
    <div class="t-flex t-w-full t-justify-center t-mb-8">
      <material-icon icon="arrow_drop_down_circle" size="xl" class="" />
    </div>
    <div class="t-mb-8 t-font-semibold">
      {{ content.subheading }}
    </div>

    <!-- gallery -->
    <div class="t-flex t-flex-wrap t-justify-center t-items-center t-mb-16">
      <div v-for="img in content.img" :key="img.link" class="t-w-full md:t-w-2/5 t-mb-6 md:t-mr-6">
        <img :src="getMediaThumbnail(img.link, 0, 0)" :alt="img.alt" :title="img.alt" class="t-w-full">
      </div>
    </div>

    <div class="t-flex t-justify-center t-mb-16 t-leading-snug t-font-semibold">
      <div class="t-w-3/4">
        {{ content.headline2 }}
      </div>
    </div>

    <!-- list -->
    <div class="t-flex t-flex-wrap t-justify-center t-mb-8">
      <div v-for="(block, index) in content.table" :key="index" class="t-w-full t-mb-4 md:t-w-2/5 md:t-mr-6">
        <div class="t-mb-4 t-border t-p-1">
          {{ block.headline }}
        </div>
        <template v-if="!hasImage(block)">
          <ul class="t-list-disc t-pl-16 t-text-left t-text-xs">
            <li v-for="(entry, row) in block.list" :key="row" class="t-mb-2">
              {{ entry.text }}
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="t-flex t-justify-center t-px-4">
            <img :src="getMediaThumbnail(block.img.link, 0, 0)">
          </div>
        </template>
      </div>
    </div>

    <!-- affilinet -->
    <div class="t-flex t-justify-center t-flex t-flex-wrap t-mb-8">
      <a :href="content.affilinet.link" class="lg:t-w-2/3 t-cursor-pointer">
        <img :src="getMediaThumbnail(content.affilinet.img, 0, 0)" :alt="content.affilinet.alt" :title="content.affilinet.alt" class="t-w-full">
      </a>
    </div>

    <!-- footer -->
    <div class="t-mb-8">
      <div class="t-mb-8">
        {{ content.footer.description }}
      </div>
      <a class="t-text-white t-font-semibold" :href="content.footer.link" :title="content.footer.title">{{ content.footer.title }}</a>
    </div>
  </div>
</template>

<script>
import Page from 'icmaa-cms/mixins/Page'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'Affiliates',
  mixins: [ Page ],
  components: {
    MaterialIcon
  },
  data () {
    return {
      dataType: 'yaml'
    }
  },
  methods: {
    hasImage (block) {
      return Object.keys(block).includes('img')
    }
  }
}
</script>
