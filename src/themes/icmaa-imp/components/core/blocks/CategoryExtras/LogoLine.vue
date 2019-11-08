<template>
  <div class="t-flex t-flex-wrap">
    <div v-for="(logo, index) in logoLineItems" :key="'logo-' + index" class="t-flex-fix t-px-2" :class="[...columnClassObj]">
      <department-logo v-bind="logo.data()" class="t-flex t-justify-center t-px-4 t-py-2" :class="[ ...logoClassObj, white ? 't-bg-white' : 't-border-base-lightest t-border-b' ]" />
    </div>
    <template v-if="placeholder">
      <div v-for="i in placeholderCount" :key="`placeholder-${i}`" class="t-flex-fix t-px-2" :class="[...columnClassObj]">
        <div class="t-flex t-justify-center t-px-4 t-py-2" :class="[ ...logoClassObj, white ? 't-bg-white' : 't-border-base-lightest t-border-b' ]">
          <div class="t-w-full" :style="{ maxWidth: '74px' }">
            <placeholder ratio="53:27" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sampleSize from 'lodash-es/sampleSize'
import { getCategoryExtrasKeyByAttribute } from 'icmaa-category-extras/helpers'

import DepartmentLogo from 'theme/components/core/blocks/CategoryExtras/DepartmentLogo'
import Placeholder from 'theme/components/core/blocks/Placeholder'

export default {
  name: 'LogoLine',
  components: {
    DepartmentLogo,
    Placeholder
  },
  props: {
    parentId: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: 'logoline',
      validation: (v) => ['logoline', 'productLogoline'].includes(v)
    },
    white: {
      type: Boolean,
      default: true
    },
    logoClass: {
      type: [String, Array, Object],
      default: ''
    },
    columnClass: {
      type: [String, Array, Object],
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      categories: []
    }
  },
  computed: {
    ...mapGetters('icmaaCategoryExtras', [ 'getCategoryChildrenMap', 'getLogolineItems' ]),
    ...mapGetters({
      allCategories: 'category-next/getCategories',
      cluster: 'user/getCluster'
    }),
    categoryChildrenMap () {
      return this.getCategoryChildrenMap(this.parentId)
    },
    childCategoryIds () {
      if (!this.categoryChildrenMap) {
        return []
      }

      return this.categoryChildrenMap.children.map(c => c.id)
    },
    logoLineItems () {
      return this.getLogolineItems(this.categories, this.type)
    },
    placeholderCount () {
      return this.limit > this.logoLineItems.length && this.placeholder ? this.limit - this.logoLineItems.length : 0
    },
    logoClassObj () {
      return typeof this.logoClass === 'string' ? [this.logoClass] : this.logoClass
    },
    columnClassObj () {
      return typeof this.columnClass === 'string' ? [this.columnClass] : this.columnClass
    },
    catTypeKey () {
      return getCategoryExtrasKeyByAttribute(this.type)
    }
  },
  methods: {
    async fetchData () {
      await this.$store.dispatch('icmaaCategoryExtras/loadChildCategoryIdMap', [ this.parentId ])

      const filters = {
        'id': this.childCategoryIds,
        'ceHasLogo': true,
        [this.catTypeKey]: true
      }

      if (this.cluster) {
        filters['ceCluster'] = [this.cluster, '']
      }

      await this.$store.dispatch(
        'category-next/loadCategories',
        { filters, size: this.limit, onlyActive: true }
      )

      // Prevent flickering logoline when clicked
      // because of changing `categories` state property
      this.setCategories()
    },
    setCategories () {
      const cluster = this.cluster ? [this.cluster, ''] : false
      const categories = this.allCategories.filter(c => {
        return this.childCategoryIds.includes(c.id) &&
          c.ceHasLogo === true &&
          c[this.catTypeKey] === true &&
          (!cluster || cluster.includes(c.ceCluster))
      })

      this.categories = sampleSize(categories, this.limit)
    }
  },
  async mounted () {
    await this.fetchData()
  },
  watch: {
    async parentId () {
      await this.fetchData()
    },
    logoLineItems (items) {
      if (items.length > 0) {
        this.$emit('loaded')
      }
    }
  }
}
</script>
