<template>
  <div>
    <div class="bg-cl-secondary py25 pl20" v-if="story && story.name">
      <div class="container">
        <breadcrumbs :with-homepage="true" :routes="[]" :active-route="story.name" />
      </div>
    </div>

    <header class="bg-cl-secondary pl20" v-if="story && story.name">
      <div class="container">
        <div class="row middle-sm">
          <h2 class="col-sm-9 category-title mb10" v-if="shouldDisplayName">
            {{ story.name }}
          </h2>
        </div>
      </div>
    </header>
    <div class="container pb60">
      <sb-render v-if="story && story.content" :item="story.content" />
    </div>
  </div>
</template>

<script>
import get from 'lodash-es/get'
import config from 'config'

import { SfBreadcrumbs as Breadcrumbs } from '@storefront-ui/vue'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import getHostFromHeaders from '@vue-storefront/core/helpers/get-host-from-headers.function';

import { getSettings } from '../helpers'
import StoryblokMixin from '../components/StoryblokMixin'

const PROTOCOL = 'https://';

export default {
  name: 'StoryblokPage',
  mixins: [StoryblokMixin],
  components: {
    Breadcrumbs
  },
  metaInfo () {
    if (this.story) {
      return {
        title: get(this.story, 'content.metatags.title', this.story.name),
        meta: this.story.content?.metatags?.description
          ? [
            {
              vmid: 'description',
              name: 'description',
              content: this.story.content.metatags.description
            }
          ]
          : [],
        link: [
          {
            rel: 'canonical',
            href: this.getCanonical()
          },
          ...this.metaHreflangLinks()
        ]
      }
    }
  },
  computed: {
    shouldDisplayName () {
      return this.story.display_name === true;
    }
  },
  methods: {
    metaHreflangLinks () {
      const { hreflangPrefix } = getSettings(config.storyblok.settings)
      const alternates = get(this.story, 'alternates', [])
      if (hreflangPrefix && alternates.length > 0) {
        const alternateHreflangLinks = this.story.alternates.filter(altStory => {
          const storeCode = this.storeCodeFromSlug(altStory.full_slug)
          return get(config.storeViews, [storeCode, 'disabled'], true) === false
        })
          .map(altStory => {
            const storeCode = this.storeCodeFromSlug(altStory.full_slug)
            const storeView = get(config.storeViews, storeCode)
            return {
              rel: 'alternate',
              hreflang: get(storeView, 'seo.hreflang') || get(storeView, 'i18n.defaultLocale') || storeCode,
              href: this.getCanonical(get(config.storeViews, storeCode), altStory)
            }
          })
        return [
          {
            rel: 'alternate',
            hreflang: get(currentStoreView(), 'seo.hreflang') || get(currentStoreView(), 'i18n.defaultLocale') || currentStoreView().storeCode,
            href: this.getCanonical()
          },
          ...alternateHreflangLinks
        ]
      } else {
        return []
      }
    },
    getAbsoluteUrlForStory (fullSlug) {
      const { hreflangPrefix } = getSettings(config.storyblok.settings)

      if (!fullSlug.startsWith('/')) {
        fullSlug = `/${fullSlug}`;
      }

      if (!fullSlug.endsWith('/')) {
        fullSlug = `${fullSlug}/`;
      }
      const host = this.$ssrContext
        ? getHostFromHeaders(this.$ssrContext.server.request.headers)
        : window.location.host;

      return PROTOCOL + host + hreflangPrefix + fullSlug;
    },
    getCanonical (storeView = currentStoreView(), story = this.story) {
      const storeViewUrl = get(storeView, 'url', '')

      const url = this.isAbsoluteUrl(storeViewUrl)
        ? storeViewUrl + '/' + this.removeStoreCodeFromSlug(story.full_slug)
        : this.getAbsoluteUrlForStory(story.full_slug);

      return url.replace(/\/home/, '')
    },
    storeCodeFromSlug (slug) {
      return slug.split(/\/(.+)/)[0]
    },
    removeStoreCodeFromSlug (slug) {
      return slug.split(/\/(.+)/)[1]
    },
    isAbsoluteUrl (url) {
      return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)
    }
  }
}
</script>
