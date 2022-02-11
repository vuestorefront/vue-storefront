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
      placeholder="Select your e-commerce platform"
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
      return this.$site.themeConfig.CATEGORY;
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

      return allIntegrations.filter(({ link }) => {
        // If link is a string, the integration can be used for all e-commerce platforms
        if (typeof link === 'string') {
          return true;
        }

        // If link is an array, it only works with specified e-commerce platforms
        return link.map(({ name }) => name).includes(this.selected.value);
      });
    },

    sortedIntegrations() {
      return this.availableIntegrations.sort((a, b) => {
        const getStatusIndex = (s) => s !== this.$site.themeConfig.STATUS.WIP;

        /**
         * Order integrations by:
         *   - status (WIP integrations at the end)
         *   - name
         */
        return getStatusIndex(b.status) - getStatusIndex(a.status)
          || a.name.localeCompare(b.name);
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
  grid-template-columns: 1fr;
  gap: 20px 20px;
  margin: 20px 0;
}

.multiselect {
  margin-bottom: 20px;
}

</style>
