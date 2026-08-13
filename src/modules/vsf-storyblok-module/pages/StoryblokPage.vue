<template>
  <div>
    <div class="bg-cl-secondary py25 pl20" v-if="story && story.name">
      <div class="container">
        <page-breadcrumbs :story="story" />
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

import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { useRequestServices } from '@vue-storefront/core/request-services';

import { getSettings } from '../helpers'
import { resolveStoryblokAssetUrl } from '../helpers/storyblok-asset-url'

import StoryblokMixin from '../components/StoryblokMixin'
import PageBreadcrumbs from '../components/defaults/PageBreadcrumbs.vue';

const PROTOCOL = 'https://';

export default {
  name: 'StoryblokPage',
  setup () {
    return {
      requestServices: useRequestServices()
    };
  },
  mixins: [StoryblokMixin],
  components: {
    PageBreadcrumbs
  },
  metaInfo () {
    if (this.story) {
      const meta = this.getMetaData();
      return {
        title: get(this.story, 'content.metatags.title', this.story.name),
        meta,
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
      return PROTOCOL + this.requestServices.host + hreflangPrefix + fullSlug;
    },
    getCanonical (storeView = currentStoreView(), story = this.story) {
      const storeViewUrl = get(storeView, 'url', '')

      const url = this.isAbsoluteUrl(storeViewUrl)
        ? storeViewUrl + '/' + this.removeStoreCodeFromSlug(story.full_slug)
        : this.getAbsoluteUrlForStory(story.full_slug);

      return url.replace(/\/home/, '')
    },
    getMetaData () {
      const storeView = currentStoreView();
      const data = [
        this.getMetaItem('og:url', this.getCanonical()),
        this.getMetaItem('og:type', 'website'),
        this.getMetaItem('og:site_name', storeView.name)
      ];
      const metaTags = this.story.content?.metatags;

      if (!metaTags) {
        return data;
      }

      if (metaTags.description) {
        data.push(
          this.getMetaItem(
            'description',
            metaTags.description
          )
        );
      }

      if (metaTags.og_description) {
        data.push(
          this.getMetaItem(
            'og:description',
            metaTags.og_description
          )
        );
      }

      if (metaTags.og_title) {
        data.push(
          this.getMetaItem(
            'og:title',
            metaTags.og_title
          )
        );
      }

      if (metaTags.og_image) {
        data.push(
          this.getMetaItem(
            'og:image',
            resolveStoryblokAssetUrl(metaTags.og_image)
          )
        )
      }

      if (metaTags.twitter_image) {
        data.push(
          this.getMetaItem(
            'twitter:image',
            resolveStoryblokAssetUrl(metaTags.twitter_image)
          )
        )
      }

      return data;
    },
    getMetaItem (name, content) {
      return {
        vmid: name,
        name,
        content
      }
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
