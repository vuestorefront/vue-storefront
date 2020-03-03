<template>
  <div class="t-container">
    <teaser tags="10" :show-large="false" :show-small-in-row="true" class="t-pt-8 t-pb-4" />
    <div class="t-p-4 t--mx-1 lg:t--mx-2 t-flex t-flex-wrap">
      <twitter-status-bar screen-name="Impericonticket" :limit="1" class="t-w-full t-px-1 lg:t-px-2 t-mb-4" />
      <div v-for="(ticket, i) in sortedTickets" :key="i" class="t-w-1/2 lg:t-w-1/4 t-px-1 lg:t-px-2 t-mb-8" data-test-id="Tickets">
        <router-link :to="getCategoryRoute(ticket.category)" :title="ticket.category.name" class="t-block t-mb-4">
          <retina-image :image="getImageUrl(ticket.poster)" :alt="ticket.category.name" :placeholder="true" ratio="263:370" class="t-w-full" />
        </router-link>
        <router-link :to="getCategoryRoute(ticket.category)" :title="ticket.category.name" class="t-block t-leading-tight t-text-sm t-text-primary">
          {{ ticket.category.name }}
          <button-component type="primary" size="sm" class="t-mt-2">
            {{ $t('Buy tickets') }}
          </button-component>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'
import { getCurrentStoreviewDatetime } from 'icmaa-config/helpers/datetime'
import registerGenericCmsStateModule from 'icmaa-cms/helpers/genericStateModule'
import orderBy from 'lodash-es/orderBy'

import RetinaImage from 'theme/components/core/blocks/RetinaImage'
import ButtonComponent from 'theme/components/core/blocks/Button'
import TwitterStatusBar from 'theme/components/core/blocks/Twitter/TwitterStatusBar'
import Teaser from 'theme/components/core/blocks/Teaser/Teaser'

export default {
  name: 'Tickets',
  components: {
    RetinaImage,
    ButtonComponent,
    TwitterStatusBar,
    Teaser
  },
  computed: {
    ...mapGetters({
      rawTickets: 'icmaaCmsTickets/getAll',
      getCategories: 'category-next/getCategories'
    }),
    tickets () {
      return this.rawTickets.map(t => {
        const category = this.getCategories.find(c => t.categoryUrlKey === c.url_key)
        if (category) {
          t = Object.assign(t, { category })
        }

        return t
      }).filter(t => t.hasOwnProperty('category'))
    },
    sortedTickets () {
      return orderBy(this.tickets, ['firstDate', 'category.name'], ['asc', 'asc'])
    },
    categoryUrlKeys () {
      return this.rawTickets.map(t => t.categoryUrlKey)
    }
  },
  methods: {
    getImageUrl (image) {
      return getThumbnailPath('/' + image, 0, 0, 'media')
    },
    getCategoryRoute (category) {
      return formatCategoryLink(category)
    }
  },
  beforeCreate () {
    registerGenericCmsStateModule('tickets', 'tickets')
  },
  async created () {
    await this.$store.dispatch('icmaaCmsTickets/list', {
      show_from: { 'lt-date': getCurrentStoreviewDatetime() },
      show_to: { 'gt-date': getCurrentStoreviewDatetime() }
    })

    await this.$store.dispatch('category-next/loadCategories', {
      onlyActive: true,
      filters: {
        url_key: this.categoryUrlKeys
      }
    })
  }
}
</script>
