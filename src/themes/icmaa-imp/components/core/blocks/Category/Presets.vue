<template>
  <div class="">
    <button-component v-for="(f, i) in filters" :key="'filter-' + i" size="sm" :icon="f.active ? 'clear' : false" @click.native="changeFilter(f.filters)" class="t-ml-2 t-opacity-75 hover:t-opacity-100">
      {{ f.label }}
    </button-component>
  </div>
</template>

<script>
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  data () {
    return {
      filters: [
        { label: 'Pants', filters: [ { type: 'color', id: '173' } ], active: false },
        { label: 'Tops', filters: [ { type: 'color', id: '173' } ], active: true },
        { label: 'Wearables', filters: [ { type: 'color', id: '173' } ], active: false }
      ]
    }
  },
  components: {
    ButtonComponent
  },
  methods: {
    changeFilter (filterVariants) {
      this.$emit('change', filterVariants)
    }
  }
}
</script>
