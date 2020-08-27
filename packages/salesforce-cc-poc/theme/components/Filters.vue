<template>
  <div>
    <div class="filters desktop-only">
      <template v-for="filter in filters">
        <template v-if="filter">
          <SfHeading
            :level="4"
            :title="filter.label"
            class="filters__title sf-heading--left"
            :key="`filter-title-${filter.attributeId}`"
          />
          <div
            v-if="filter.attributeId == 'color'"
            class="filters__colors"
            :key="`${filterName}-colors`"
          >
            <SfColor
              v-for="option in filter.values"
              :key="`${filter.attributeId}-${option.label}`"
              :data-cy="`category-filter_color_${option.value}`"
              :color="option.value"
              :selected="option.selected"
              class="filters__color"
              @click="option.selected = !option.selected"
            />
          </div>
          <template v-else>
            <SfFilter
              v-for="option in filter.values"
              :key="`${filter.attributeId}-${option.label}`"
              :data-cy="`category-filter_${filter.attributeId}_${option.value}`"
              :label="option.label"
              :selected="option.selected"
              class="filters__item"
              @change="option.selected = !option.selected"
            ></SfFilter>
          </template>
        </template>
      </template>
      <div class="filters__buttons">
        <!-- <SfButton
          @click="applyFilters"
          class="sf-button--full-width"
        >Done</SfButton> -->
        <SfButton
          @click="clearFilters"
          class="sf-button--full-width filters__button-clear"
        >Clear all</SfButton>
      </div>
    </div>
    <SfAccordion class="filters mobile-only">
      <slot name="categories-mobile"></slot>
      <template v-for="filter in filters">
        <SfAccordionItem
          v-if="filter"
          :key="`filter-title-${filter.attributeId}`"
          :header="filter.label"
          class="filters__accordion-item"
        >
          <SfFilter
            v-for="option in filter.values"
            :key="`${filter.attributeId}-${option.label}`"
            :label="option.label"
            :selected="option.selected"
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
    filters: {
      required: true
    }
  },
  setup(props, { emit }) {
    const filtersMap = {
    };

    const clearFilters = () => {
      Object.keys(props.filters).forEach((name) => {
        props.filters[name].options.forEach((value) => {
          value.selected = false;
        });
      });
      emit('click:apply-filters', props.filters);
    };
    const applyFilters = () => emit('click:apply-filters', props.filters);

    return {
      clearFilters,
      applyFilters,
      filtersMap
    };
  }
};
</script>
