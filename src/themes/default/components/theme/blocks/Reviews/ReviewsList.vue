<template>
  <div>
    <div class="mt50 h5" v-if="!itemsPerPage || itemsPerPage.length === 0">
      {{ $t('No reviews have been posted yet. Please don\'t hesitate to share Your opinion and write the first review!') }}
    </div>
    <div class="mt50" v-for="(item, index) in itemsPerPage" :key="index">
      <h4 class="weight-400 m0">
        {{ item.title }}
      </h4>
      <p class="cl-tertiary mt10 mb20 fs-medium-small">
        {{ item.nickname }}, {{ item.created_at | date(null, storeView) }}
      </p>
      <p class="cl-gray lh25">
        {{ item.detail }}
      </p>
    </div>
    <div class="row middle-xs center-xs mt50" v-if="pageCount > 1">
      <a href="#" class="mr10 no-underline" :class="{ inactive: currentPage === 1 }" @click.prevent="prevPage">
        <i class="material-icons">chevron_left</i>
      </a>
      <span class="mx10 pagination-page" v-for="pageNumber in pageList" :key="pageNumber">
        <span class="fs-medium block py15 px20 bg-cl-mine-shaft cl-white" v-if="pageNumber === currentPage">
          {{ pageNumber }}
        </span>
        <a href="#" class="fs-medium block py15 px20 bg-cl-secondary pointer" v-else @click.prevent="changePage(pageNumber)">
          {{ pageNumber }}
        </a>
      </span>
      <a href="#" class="ml10 no-underline" :class="{ inactive: currentPage === pageCount }" @click.prevent="nextPage">
        <i class="material-icons">chevron_right</i>
      </a>
    </div>
    <script v-html="getJsonLd" type="application/ld+json" />
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { reviewJsonLd } from '@vue-storefront/core/helpers'
export default {
  props: {
    perPage: {
      type: Number,
      required: false,
      default: 4
    },
    items: {
      type: Array,
      default: () => []
    },
    productName: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    itemsPerPage () {
      let start = ((this.currentPage - 1) * this.perPage)
      let end = start + this.perPage
      return this.items.slice(start, end).filter(review => !!review.review_status)
    },
    pageCount () {
      return Math.floor(this.items.length / this.perPage) + Math.min(1, this.items.length % this.perPage)
    },
    pageList () {
      if (this.pageCount <= 5 || this.currentPage === 1 || this.currentPage === 2) {
        const pages = []
        for (let i = 1; i <= Math.min(this.pageCount, 5); i += 1) {
          pages.push(i)
        }
        return pages
      } else if (this.currentPage === this.pageCount || this.currentPage === this.pageCount - 1) {
        const pages = []
        for (let i = this.pageCount; i >= 1 && i >= this.pageCount - 4; i -= 1) {
          pages.unshift(i)
        }
        return pages
      } else {
        return [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2]
      }
    },
    storeView () {
      return currentStoreView()
    },
    getJsonLd () {
      return reviewJsonLd(this.itemsPerPage, this.product, this.$store.state.storeView.i18n.currencyCode)
    }
  },
  methods: {
    prevPage () {
      this.currentPage = Math.max(1, this.currentPage - 1)
    },
    nextPage () {
      this.currentPage = Math.min(this.pageCount, this.currentPage + 1)
    },
    changePage (pageNumber) {
      this.currentPage = Math.max(1, Math.min(this.pageCount, pageNumber))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$mine-shaft: color(mine-shaft);
$white: color(white);

.inactive {
  opacity: 0.5;
  pointer-events: none;
}
.material-icons {
  font-size: 30px;
  line-height: 30px;
}
.pagination-page {
  a {
    &:hover {
      background-color: $mine-shaft;
      color: $white;
    }
  }
  @media (max-width: 767px) {
    margin: 0;
  }
  a, span {
    @media (max-width: 767px) {
      padding: 10px 12px;
      font-size: 16px;
    }
  }
}
</style>
