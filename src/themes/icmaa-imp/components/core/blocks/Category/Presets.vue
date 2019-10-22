<template>
  <div class="">
    <button-component v-for="(p, i) in presets" :key="'filter-' + i" size="sm" :icon="p.active ? 'clear' : false" @click.native="changeFilter(p)" class="t-ml-2 t-opacity-75 hover:t-opacity-100">
      {{ p.label }}
    </button-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonComponent from 'theme/components/core/blocks/Button'
import mapValues from 'lodash-es/mapValues'
import intersection from 'lodash-es/intersection'
import sampleSize from 'lodash-es/sampleSize'

export default {
  data () {
    return {
      presetsX: [
        { label: 'Jeans', filters: [ { type: 'type_pants', id: '731' }, { type: 'color', id: '173' } ] },
        { label: 'Black Jeans', filters: [ { type: 'type_pants', id: '731' } ], clusters: ['5172', '4348'] },
        { label: 'Sneaker', filters: [ { type: 'type_shoes', id: '993' } ] },
        { label: 'T-Shirts', filters: [ { type: 'type_top', id: '99' } ] },
        { label: 'Yellow T-Shirts', filters: [ { type: 'type_top', id: '99' }, { type: 'color', id: '173' } ] }
      ]
    }
  },
  props: {
    limit: {
      type: Number,
      default: 4
    }
  },
  components: {
    ButtonComponent
  },
  computed: {
    ...mapGetters({
      selectedFilters: 'category-next/getCurrentFilters',
      getAvailableFilters: 'category-next/getAvailableFilters',
      cluster: 'user/getCluster'
    }),
    availableFilters () {
      return mapValues(this.getAvailableFilters, (v) => v.map(o => o.id))
    },
    allAvailableFilterIds () {
      return [].concat(...Object.values(this.availableFilters))
    },
    allSelectedFilterCodes () {
      return Object.keys(this.selectedFilters)
    },
    allSelectedFilterIds () {
      let filters = Object.values(this.selectedFilters).map(f => !Array.isArray(f) ? [f] : f)
      return [].concat(...filters).map(f => f.id)
    },
    presets () {
      let cluster = this.cluster
      let presets = this.presetsX
        .filter(p => {
          const filterIds = [].concat(...p.filters.map(f => f.id))
          return intersection(filterIds, this.allAvailableFilterIds).length === filterIds.length
        })
        .filter(p => (!p.clusters || p.clusters.length === 0 || (cluster && p.clusters.includes(cluster))))
        .map(preset => {
          preset.active = true
          const presetFilterCodes = preset.filters.map(f => f.type)
          const presetFilterIds = [].concat(...preset.filters.map(f => f.id))

          if (intersection(this.allSelectedFilterCodes, presetFilterCodes).length !== presetFilterCodes.length ||
            intersection(this.allSelectedFilterIds, presetFilterIds).length !== presetFilterIds.length ||
            this.allSelectedFilterIds.length !== presetFilterIds.length
          ) {
            preset.active = false
          }

          return preset
        })

      presets = sampleSize(presets, this.limit)

      if (cluster) {
        const presetsWithCluster = presets.filter(p => p.clusters)
        const presetsWithoutCluster = presets.filter(p => !p.clusters)
        presets = presetsWithCluster.concat(presetsWithoutCluster)
      }

      return presets
    }
  },
  methods: {
    async changeFilter (preset) {
      if (preset.active) {
        return this.$store.dispatch('category-next/resetSearchFilters')
      }

      let { filters } = preset
      if (!Array.isArray(filters)) {
        filters = [filters]
      }

      return this.$store.dispatch('category-next/setSearchFilters', filters)
    }
  }
}
</script>
