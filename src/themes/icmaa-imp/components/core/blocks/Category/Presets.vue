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

export default {
  data () {
    return {
      presetsX: [
        { label: 'Jeans', filters: [ { type: 'type_pants', id: '731' } ] },
        { label: 'Sneaker', filters: [ { type: 'type_shoes', id: '993' } ] },
        { label: 'T-Shirts', filters: [ { type: 'type_top', id: '99' } ] }
      ]
    }
  },
  components: {
    ButtonComponent
  },
  computed: {
    ...mapGetters({ selectedFilters: 'category-next/getCurrentFilters' }),
    presets () {
      return this.presetsX.map(p => {
        p.active = true
        p.filters.forEach(f => {
          let selectedFilters = this.selectedFilters[f.type]
          if (selectedFilters && !Array.isArray(selectedFilters)) {
            selectedFilters = [selectedFilters]
          }
          selectedFilters = selectedFilters ? selectedFilters.map(cf => cf.id) : false

          if (!selectedFilters ||
            !selectedFilters.includes(f.id) ||
            selectedFilters.length !== p.filters.length ||
            Object.keys(this.selectedFilters).length !== p.filters.length
          ) {
            p.active = false
          }
        })

        return p
      })
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
