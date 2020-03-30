<template>
  <div class="twitter-feed">
    <div class="placeholder" v-if="loading">
      <div v-for="(s, i) in limit" :key="i" class="t-bg-white t-mb-2 t-p-4 t-flex t-flex-col">
        <div class="t-h-4 t-bg-base-lightest t-mb-2" v-for="(l, j) in 3" :key="j" />
        <div class="t-flex t-items-center t-justify-between t-text-xs t-text-base-lighter">
          <material-icon icon="repeat" size="sm" class="t-mr-1" /> 0
          <material-icon icon="favorite" size="sm" class="t-mr-1 t-ml-4" /> 0
          <span class="t-flex-1" />
          <span class="t-text-base-lighter">
            <material-icon icon="chevron_right" size="sm" />
          </span>
        </div>
      </div>
    </div>
    <div v-for="(s, i) in status" :key="i" class="t-bg-white t-mb-2 t-p-4">
      <div v-html="twitterify(s.text)" class="t-text-base-tone t-text-sm t-leading-snug" />
      <div class="t-flex t-items-center t-justify-between t-mt-2 t-text-xs t-text-base-lighter">
        <material-icon icon="repeat" size="sm" class="t-mr-1" /> {{ s.retweet_count }}
        <material-icon icon="favorite" size="sm" class="t-mr-1 t-ml-4" /> {{ s.favorite_count }}
        <span class="t-flex-1" />
        <a :href="`https://twitter.com/${screenName}/status/${s.id_str}`" target="_blank" rel="noopener noreferrer" class="t-text-base-lighter">
          <material-icon icon="chevron_right" size="sm" />
          <span class="t-sr-only">{{ $t('Read more') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import TwitterStatusFeed from 'icmaa-twitter/components/TwitterStatusFeed'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'TwitterStatusFeed',
  components: {
    MaterialIcon
  },
  mixins: [ TwitterStatusFeed ]
}
</script>
