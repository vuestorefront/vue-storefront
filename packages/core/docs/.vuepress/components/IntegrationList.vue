<template>
  <div>
    <multiselect v-if="filterable" v-model="selected" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select your eCommerce platform" :options="options" :searchable="false" :allow-empty="false">
      <template slot="singleLabel" slot-scope="{ option }"> {{ option.name }}</template>
    </multiselect>
    <div class="list">
      <slot />
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  props: ['filterable'],
  components: {
    Multiselect
  },
  watch: {
    selected: function (val, oldVal) {
      this.filter()
    }
  },
  methods: {
    filter () {
      this.$children
      .filter(component => component.$options._componentTag === 'IntegrationTile')
      .forEach(integration => {
        if (this.selected.value === 'all') {
          integration.isVisible = true;
          return;
        }
        const isCompatible = integration.compatibility.some(platform => platform === this.selected.value)
        integration.isVisible = isCompatible 
      })
    }
  },
  data () {
    return {
      selected: null,
      options: [
        { name: 'Show all integrations', value: 'all' },
        { name: 'Commercetools', value: 'commercetools' }
      ]
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-content: space-evenly;
  flex-wrap: wrap;
}

.multiselect {
  margin-bottom: 20px;
}
</style>