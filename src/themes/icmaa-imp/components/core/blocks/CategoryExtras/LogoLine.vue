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

import DepartmentLogo from 'theme/components/core/blocks/CategoryExtras/DepartmentLogo'
import Placeholder from 'theme/components/core/blocks/Placeholder'

export default {
  components: {
    DepartmentLogo,
    Placeholder
  },
  data: function () {
    return {
      categories: []
    }
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
  async mounted () {
    await this.$store.dispatch('icmaaCategoryExtras/loadDepartmentLogos')
    await this.$store.dispatch('icmaaCategoryExtras/loadChildCategoryIdMap', [ this.parentId ])

    const filters = { 'url_key': this.randomDepartmentLogoIdentifier }
    this.categories = await this.$store.dispatch('category-next/loadCategories', { filters })
  },
  computed: {
    ...mapGetters('icmaaCategoryExtras', [ 'getCategoryChildrenMap', 'getDepartmentLogos', 'getLogolineItems' ]),
    ...mapGetters({ cluster: 'user/getCluster' }),
    categoryChildrenMap () {
      return this.getCategoryChildrenMap(this.parentId)
    },
    childrenIdentifier () {
      if (this.categoryChildrenMap) {
        return this.categoryChildrenMap.children.map(c => c.url_key)
      }

      return []
    },
    randomDepartmentLogoIdentifier () {
      const logos = this.getDepartmentLogos
        .filter(logo => {
          return (this.cluster ? (logo.customerCluster.includes(this.cluster) || logo.customerCluster.length === 0) : true) &&
            this.childrenIdentifier.includes(logo.identifier)
        })
        .map(l => l.identifier)

      return sampleSize(logos, this.limit)
    },
    logoLineItems () {
      return this.getLogolineItems(this.categories)
    },
    placeholderCount () {
      return this.limit > this.logoLineItems.length && this.placeholder ? this.limit - this.logoLineItems.length : 0
    },
    logoClassObj () {
      return typeof this.logoClass === 'string' ? [this.logoClass] : this.logoClass
    },
    columnClassObj () {
      return typeof this.columnClass === 'string' ? [this.columnClass] : this.columnClass
    }
  },
  watch: {
    logoLineItems (items) {
      if (items.length > 0) {
        this.$emit('loaded')
      }
    }
  }
}
</script>
