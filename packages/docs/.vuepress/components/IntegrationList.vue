<template>
  <div>
    <multiselect
      v-if="filterable"
      v-model="selected"
      :options="options"
      :searchable="false"
      :allow-empty="false"
      deselect-label="Can't remove this value"
      track-by="name"
      label="name"
      placeholder="Select your eCommerce platform"
    >
      <template
        slot="singleLabel"
        slot-scope="{ option }">
        {{ option.name }}
      </template>
    </multiselect>

    <div class="list">
      <IntegrationTile
        v-for="integration in sortedIntegrations"
        :key="integration.key"
        v-bind="integration"
      />
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import IntegrationTile from './IntegrationTile.vue';

export default {
  name: 'IntegrationList',

  props: {
    type: {
      type: String,
      required: true
    },

    filterable: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    Multiselect,
    IntegrationTile
  },

  data () {
    return {
      selected: null
    }
  },

  computed: {
    categories() {
      return this.$site.themeConfig.CATEGORIES;
    },

    options() {
      if (!this.filterable) {
        return [];
      }

      const integrationNames = this.$site.themeConfig.INTEGRATIONS.eCommerce.map(({ name }) => ({
        name,
        value: name
      }));

      integrationNames.unshift({
        name: 'Show all integrations',
        value: ''
      });

      return integrationNames;
    },

    availableIntegrations() {
      const allIntegrations = this.$site.themeConfig.INTEGRATIONS[this.type];

      if (!this.filterable || !this.selected?.value) {
        return allIntegrations;
      }

      // Return integrations without specific compabilities or including currently selected eCommerce platform
      return allIntegrations.filter(({ compatibility }) => {
        return !compatibility
          || !compatibility.length
          || compatibility.includes(this.selected.value);
      });
    },

    sortedIntegrations() {
      return this.availableIntegrations.sort((a, b) => {
        const getIndex = (s) => {
          return Object
            .values(this.$site.themeConfig.STATUSES)
            .findIndex(status => status === s);
        }

        // Order integrations in reversed order of available STATUSES
        return getIndex(b.status) - getIndex(a.status);
      })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.list {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-auto-rows: 1fr; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px 20px; 
  margin: 20px 0;
}

.multiselect {
  margin-bottom: 20px;
}

@media (max-width: 1023px) {
  .list {
    grid-template-columns: 1fr; 
  }
}
</style>
