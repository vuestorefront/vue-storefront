<template>
  <div id="page_not_found" class="t-container">
    <div class="t-p-4 t-flex t-flex-wrap t-justify-center">
      <h1 class="t-w-full lg:t-w-auto t-flex-fix t-no-underline t-flex t-items-center t-justify-center t-bg-primary t-font-black t-font-mono t-py-4 t-px-8 t-text-5xl t-text-white">
        {{ $t('404') }}
      </h1>
      <div class="t-p-8 t-bg-white t-text-base-tone t-text-sm">
        <h2 class="t-text-base-dark t-font-bold t-text-xl t-mb-2">
          {{ $t("Unfortunately we can't find the page you are looking for.") }}
        </h2>
        <i18n path="If you need assistance you can drop {link}." tag="p" class="t-mb-2 lg:t-mb-0">
          <router-link :to="localizedRoute(`/service`)" place="link" class="t-text-base-tone t-underline">
            {{ $t('us a line here') }}
          </router-link>
        </i18n>
        <i18n path="You can also use {link} to find anything you were looking for." tag="p">
          <span @click="toggleSearchpanel" place="link" class="t-cursor-pointer t-text-base-tone t-underline">
            {{ $t('our search') }}
          </span>
        </i18n>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'PageNotFound',
  mixins: [Composite],
  async asyncData ({ store, route, context }) {
    Logger.log('Entering asyncData for PageNotFound ' + new Date())()
    if (context) {
      context.output.cacheTags.add(`page-not-found`)
      context.server.response.statusCode = 404
    }
  },
  methods: {
    toggleSearchpanel () {
      this.$store.dispatch('ui/setSearchpanel', true)
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('404 Page Not Found'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
}
</script>
