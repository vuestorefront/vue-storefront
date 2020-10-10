<template>
  <div>
    <div class="filters desktop-only">
      <template v-for="facet in facets">
        <SfHeading
          :level="4"
          :title="facet.label"
          class="filters__title sf-heading--left"
          :key="`filter-title-${facet.id}`"
        />
          <div
            v-if="isFacetColor(facet)"
            class="filters__colors"
            :key="`${facet.id}-colors`"
          >
            <SfColor
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :data-cy="`category-filter_color_${option.value}`"
              :color="option.value"
              :selected="isFilterSelected(facet, option)"
              class="filters__color"
              @click="() => selectFilter(facet, option)"
            />
          </div>
          <template v-else>
            <SfFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.value}`"
              :data-cy="`category-filter_${facet.id}_${option.value}`"
              :label="option.id + `${option.count && ` (${option.count})`}`"
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </template>
      </template>
      <div class="filters__buttons">
        <SfButton @click="applyFilters" class="sf-button--full-width">Done</SfButton>
        <SfButton @click="clearFilters" class="sf-button--full-width filters__button-clear">Clear all</SfButton>
      </div>
    </div>
    <SfAccordion class="filters mobile-only">
      <slot name="categories-mobile"></slot>
      <template v-for="facet in facets">
        <SfAccordionItem
          :key="`filter-title-${facet.id}`"
          :header="facet.label"
          class="filters__accordion-item"
        >
          <SfFilter
            v-for="option in facet.options"
            :key="`${facet.id}-${option.id}`"
            :label="option.id"
            :selected="isFilterSelected(facet, option)"
            class="filters__item"
            @change="option.selected = !option.selected"
          />
        </SfAccordionItem>
      </template>
    </SfAccordion>
  </div>
</template>

<script>
import {
  SfFilter,
  SfButton,
  SfHeading,
  SfAccordion,
  SfColor
} from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';
import { useUiHelpers, useUiState } from '~/composables';
import Vue from 'vue';

export default {
  name: 'Filters',
  components: {
    SfFilter,
    SfButton,
    SfHeading,
    SfAccordion,
    SfColor
  },
  props: {
    facets: {
      required: true
    }
  },
  setup(props) {
    const { changeFilters, isFacetColor } = useUiHelpers();
    const { toggleFilterSidebar } = useUiState();
    const selectedFilters = ref({});

    onMounted(() => {
      selectedFilters.value = props.facets.reduce((prev, curr) => ({
        ...prev,
        [curr.id]: curr.options
          .filter(o => o.selected)
          .map(o => o.id)
      }), {});
    });

    const isFilterSelected = (facet, option) => (selectedFilters.value[facet.id] || []).includes(option.id);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value[facet.id]) {
        Vue.set(selectedFilters.value, facet.id, []);
      }

      if (selectedFilters.value[facet.id].find(f => f === option.id)) {
        selectedFilters.value[facet.id] = selectedFilters.value[facet.id].filter(f => f !== option.id);
        return;
      }

      selectedFilters.value[facet.id].push(option.id);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = {};
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    return {
      isFacetColor,
      selectFilter,
      isFilterSelected,
      selectedFilters,
      clearFilters,
      applyFilters
    };
  }
};
</script>
