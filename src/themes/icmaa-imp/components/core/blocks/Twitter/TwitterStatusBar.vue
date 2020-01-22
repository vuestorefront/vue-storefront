<template>
  <div class="twitter-feed" v-if="status.length > 0">
    <a v-for="(s, i) in status" :key="i" :href="`https://twitter.com/${screenName}/status/${s.id_str}`" target="_blank" class="t-bg-twitter t-flex t-items-center">
      <material-icon icon="twitter" icon-set="icmaa" size="md" class="t-self-start t-pt-3 lg:t-self-center lg:t-pt-0 t-pl-4 t-text-white" />
      <span v-html="twitterify(s.text)" class="t-flex-auto t-leading-snug t-text-sm t-text-white t-p-3" />
      <span class="t-border-base-lightest t-border-l t-hidden lg:t-flex t-items-center t-p-3 t-text-sm t-text-white t-self-stretch">
        <span>{{ $t('Read more') }}</span>
        <material-icon icon="chevron_right" size="sm" />
      </span>
    </a>
  </div>
</template>

<script>
import TwitterStatusFeed from 'icmaa-twitter/components/TwitterStatusFeed'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'TwitterStatusBar',
  components: {
    MaterialIcon
  },
  mixins: [ TwitterStatusFeed ]
}
</script>
