<template>
  <div class="t-flex t-flex-wrap">
    <div v-for="(logo, index) in logoLineItems" :key="'logo-' + index" class="t-flex-fix t-px-2">
      <department-logo v-bind="logo.data()" class="t-flex t-px-4 t-py-2" :class="[ ...logoClassObj, white ? 't-bg-white' : 't-border-base-lightest t-border-b' ]" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sampleSize from 'lodash-es/sampleSize'

import DepartmentLogo from 'theme/components/core/blocks/CategoryExtras/DepartmentLogo'

export default {
  components: {
    DepartmentLogo
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
    logoClassObj () {
      return typeof this.logoClass === 'string' ? [this.logoClass] : this.logoClass
    }
  }
}
</script>
