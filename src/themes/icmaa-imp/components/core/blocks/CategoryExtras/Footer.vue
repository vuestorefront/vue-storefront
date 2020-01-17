<template>
  <div class="t-flex t-flex-wrap t--mx-4 t-px-4" v-if="isVisible && (description || footerDescription)">
    <div class="t-w-full md:t-w-1/3 t-mb-8 md:t-mb-0 t-px-4" v-if="hasVideo">
      <h3 class="t-flex t-items-center t-text-xl t-text-youtube t-font-thin t-leading-1-em t-mb-4">
        <span class="t-flex t-flex-fix t-items-center t-justify-center t-w-10 t-h-10 t-rounded-full t-text-white t-bg-youtube t-mr-2">
          <material-icon icon="youtube" icon-set="icmaa" class="t-flex md:t-text-lg lg:t-text-2xl" />
        </span>
        YouTube
      </h3>
      <div class="t-relative t-w-full t-bg-white" style="padding-top: 56.25%" v-if="youtubeVideo">
        <iframe class="t-absolute t-top-0" width="100%" height="100%" :src="youtubeVideo" frameborder="0" allowfullscreen />
      </div>
      <div class="t-relative t-w-full t-bg-white" style="padding-top: 56.25%" v-else-if="vimeoVideo">
        <iframe class="t-absolute t-top-0" width="100%" height="100%" :src="vimeoVideo" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />
      </div>
    </div>
    <div class="t-w-full md:t-w-1/3 t-mb-6 md:t-mb-0 t-px-4" v-if="twitterId">
      <h3 class="t-flex t-items-center t-text-xl t-text-twitter t-font-thin t-leading-1-em t-mb-4">
        <span class="t-flex t-flex-fix t-items-center t-justify-center t-w-10 t-h-10 t-rounded-full t-text-white t-bg-twitter t-mr-2">
          <material-icon icon="twitter" icon-set="icmaa" class="t-flex md:t-text-lg lg:t-text-2xl" />
        </span>
        <a :href="`https://twitter.com/${twitterId}`" target="_blank" class="t-text-twitter" v-if="twitterId">
          {{ '@' + twitterId }}
        </a>
        <span v-else>Twitter</span>
      </h3>
      <twitter-status-feed :screen-name="twitterId" />
    </div>
    <div class="t-w-full md:t-w-1/3 t-mb-8 md:t-mb-0 t-px-4" :class="[ (!hasVideo || !twitterId) ? 'md:t-w-2/3' : 'md:t-w-1/3' ]" v-if="description">
      <h2 class="t-flex t-items-center t-h-10 t-text-1xl t-text-base-dark t-font-thin t-leading-1-em t-mb-4">
        {{ categoryExtras.title }}
      </h2>
      <p class="t-text-base-tone t-text-sm t-leading-snug" v-html="descriptionFolded ? descriptionShort : description" />
      <div class="t-text-base-light t-text-sm t-leading-1em t-mt-4 t-cursor-pointer" v-if="isLongDescription" @click="descriptionFolded = !descriptionFolded">
        <material-icon :icon="descriptionFolded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'" size="xs" class="t-align-middle" />
        {{ descriptionFolded ? $t('Read more') : $t('Read less') }}
      </div>
    </div>
    <div class="t-w-full t-px-4 t-mt-8 t-text-xs t-text-base-lighter t-leading-snug" v-if="footerDescription">
      {{ footerDescription }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { stripHTML } from '@vue-storefront/core/filters'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import TwitterStatusFeed from 'theme/components/core/blocks/Twitter/TwitterStatusFeed'

export default {
  name: 'CategoryExtrasFooter',
  components: {
    MaterialIcon,
    TwitterStatusFeed
  },
  data () {
    return {
      descriptionFolded: false
    }
  },
  computed: {
    ...mapGetters({
      category: 'icmaaCategoryExtras/getCurrentCategory',
      categoryExtras: 'icmaaCategoryExtras/getCategoryExtrasByCurrentCategory',
      viewport: 'ui/getViewport'
    }),
    isVisible () {
      return this.categoryExtras && this.categoryExtras.active
    },
    description () {
      return this.categoryExtras.description
    },
    descriptionShort () {
      return stripHTML(this.trimText(this.categoryExtras.description, 500))
    },
    isLongDescription () {
      return (stripHTML(this.description).length > 500)
    },
    footerDescription () {
      return this.categoryExtras.descriptionFooter || false
    },
    hasVideo () {
      return (this.youtubeVideo || this.vimeoVideo)
    },
    youtubeVideo () {
      if (this.categoryExtras.videoYoutube.length > 0) {
        return `https://www.youtube.com/embed/${this.categoryExtras.videoYoutube}`
      }

      return false
    },
    vimeoVideo () {
      if (this.categoryExtras.videoVimeo.length > 0) {
        return `https://player.vimeo.com/video/${this.categoryExtras.videoVimeo}`
      }

      return false
    },
    twitterId () {
      return this.categoryExtras.twitterId || false
    }
  },
  methods: {
    trimText (text, size = 300) {
      let truncatedText = text.slice(0, size)
      if (text.slice(size, size + 1) !== ' ') {
        Array.from(text.slice(size))
          .some(l => {
            truncatedText = truncatedText + l
            return (l === ' ')
          })
      }

      return truncatedText + '...'
    }
  },
  created () {
    if (this.isLongDescription) {
      this.descriptionFolded = true
    }
  }
}
</script>
