<template>
  <div class="t-container">
    <div class="t-p-2 t-py-8">
      <h1 class="t-px-2 t-text-1xl t-mb-4 t-font-bold">
        Teaser Quality Assurance
      </h1>
      <no-ssr>
        <div class="t-flex t-flex-wrap t-px-2 t-mx-2 t-py-4 t-bg-white">
          <base-select :options="typeOptions" name="type" id="type" v-model="type" label="View by" class="t-w-full lg:t-w-1/3 t-px-2 t-pb-4 lg:t-pb-0" />
          <base-select :options="tagOptions" name="tag" id="tag" v-model="tag" label="Tag" class="t-w-full lg:t-w-1/3 t-px-2 t-pb-4 lg:t-pb-0" v-show="type === 'tag'" />
          <base-select :options="customerclusterOptions" name="cluster" id="cluster" v-model="cluster" label="Cluster" class="t-w-full lg:t-w-1/3 t-px-2 t-pb-4 lg:t-pb-0" v-show="type === 'cluster'" />
          <base-checkbox name="showAsSplitTeaser" id="showAsSplitTeaser" v-model="showAsSplitTeaser" class="t-w-full lg:t-w-1/3 lg:t-mt-6 t-px-2">
            Show small teaser as split-teaser
          </base-checkbox>
        </div>
      </no-ssr>
      <div class="t-pt-8 t-px-2" v-for="(teaser, i) in teaserList" :key="getUniqueKey('wrap', i, teaser)">
        <div v-if="type === 'cluster'" class="t-font-bold t-mb-4 t-text-1xl t-font-mono">
          {{ teaser.tagsLabel }}
        </div>
        <div v-if="type === 'tag'" class="t-font-bold t-mb-4 t-text-1xl t-font-mono">
          {{ teaser.customerclusterLabel }}
        </div>
        <teaser :tags="`${teaser.tags}`" :customercluster="`${teaser.customercluster}`" :show-small-in-row="!showAsSplitTeaser" :redirect-to-edit="true" class="t--mx-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Teaser from 'theme/components/core/blocks/Teaser/Teaser'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'TeaserQualityAssurance',
  components: {
    Teaser,
    BaseSelect,
    BaseCheckbox,
    'no-ssr': NoSSR
  },
  data () {
    return {
      type: '',
      tag: '',
      cluster: '',
      showAsSplitTeaser: false
    }
  },
  computed: {
    ...mapGetters({
      attributes: 'attribute/getAttributeListByCode',
      tags: 'icmaaTeaser/getTags'
    }),
    typeOptions () {
      return [
        { label: 'Cluster', value: 'cluster' },
        { label: 'Tag', value: 'tag' }
      ]
    },
    tagOptions () {
      return this.tags || []
    },
    customerclusterOptions () {
      if (!this.attributes.hasOwnProperty('customercluster')) {
        return []
      }

      return this.attributes.customercluster.options.map(o => {
        return { value: o.value, label: `#${o.value} ${o.label}` }
      })
    },
    teaserList () {
      if (this.type === 'tag' && this.tag !== '') {
        return this.customerclusterOptions.map(c => {
          return {
            tags: this.tag,
            tagsLabel: this.getOptionLabel(this.tagOptions, this.tag),
            customercluster: c.value,
            customerclusterLabel: c.label
          }
        })
      } else if (this.type === 'cluster' && this.cluster !== '') {
        return this.tagOptions.map(t => {
          return {
            tags: t.value,
            tagsLabel: t.label,
            customercluster: this.cluster,
            customerclusterLabel: this.getOptionLabel(this.customerclusterOptions, this.cluster)
          }
        })
      }

      return []
    }
  },
  methods: {
    getOptionLabel (options, value) {
      const option = options.find(o => o.value === value)
      return option ? option.label : value
    },
    getUniqueKey (prefix, index, teaser) {
      return [prefix, index, teaser.tags, teaser.customercluster].join('_')
    }
  },
  mounted () {
    Promise.all([
      this.$store.dispatch('attribute/list', { filterValues: [ 'customercluster' ] }),
      this.$store.dispatch('icmaaTeaser/fetchTags')
    ]).then(() => {
      const { cluster, tag } = this.$route.query
      if (cluster) {
        this.type = 'cluster'
        this.cluster = cluster
      } else if (tag) {
        this.type = 'tag'
        this.tag = tag
      }
    })
  }
}
</script>
