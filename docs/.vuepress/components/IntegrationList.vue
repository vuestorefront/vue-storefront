<template>
  <div>
    <VueMultiselect
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
    </VueMultiselect>

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
import { ref, computed } from 'vue';
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import VueMultiselect from 'vue-multiselect';

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
    VueMultiselect
  },

  setup(props) {
    const selected = ref(null);
    const theme = useThemeData();

    const options = computed(() => {
      if (!props.filterable) {
        return [];
      }

      const integrationNames = theme.value.INTEGRATIONS.eCommerce.map(({ name }) => ({
        name,
        value: name
      }));

      integrationNames.unshift({
        name: 'Show all integrations',
        value: ''
      });

      return integrationNames;
    });

    const availableIntegrations = computed(() => {
      const allIntegrations = theme.value.INTEGRATIONS[props.type];

      if (!props.filterable || !selected?.value) {
        return allIntegrations;
      }

      // Return integrations without specific compabilities or including currently selected eCommerce platform
      return allIntegrations.filter(({ compatibility }) => {
        return !compatibility
          || !compatibility.length
          || compatibility.includes(props.selected.value);
      });
    });

    const sortedIntegrations = computed(() => {
      return availableIntegrations.value.sort((a, b) => {
        const getIndex = (s) => {
          return Object
            .values(theme.value.STATUSES)
            .findIndex(status => status === s);
        }

        // Order integrations in reversed order of available STATUSES
        return getIndex(b.status) - getIndex(a.status);
      })
    });

    return {
      selected,
      options,
      availableIntegrations,
      sortedIntegrations
    };
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

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
