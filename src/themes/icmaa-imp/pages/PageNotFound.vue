<template>
  <div id="page_not_found">
    <section class="bg-cl-secondary py35 px20">
      <div class="container">
        <h2>
          {{ $t("We can't find the page") }}
        </h2>
      </div>
    </section>
    <section class="bg-cl-primary py35 px20">
      <div class="container">
        <div class="lh16 h5 weight-400">
          <p>
            {{ $t("Unfortunately we can't find the page you are looking for.") }}
          </p>
          <p>
            {{ $t('If you need an assistance you can drop us a line on') }}
            <router-link :to="localizedRoute('/')" class="cl-secondary no-underline">
              {{ $t('a chat') }}
            </router-link>
            {{ $t('or write to us through') }}
            <router-link :to="localizedRoute('/contact')" class="cl-secondary no-underline">
              {{ $t('a contact page') }}
            </router-link>.
          </p>
          <p>
            {{ $t('You can also use') }}
            <a href="#" class="cl-secondary no-underline" @click="toggleSearchpanel">
              {{ $t('search') }}
            </a>
            {{ $t('to find product you were looking for.') }}
          </p>
        </div>
      </div>
    </section>
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
