<template>
  <div>
    <div class="filters desktop-only">
      <template v-for="(label, filterName) in filtersMap">
        <template v-if="filters[filterName]">
          <SfHeading
            :level="4"
            :title="label"
            class="filters__title sf-heading--left"
            :key="`filter-title-${filterName}`"
          />
          <div
            v-if="filterName == 'color'"
            class="filters__colors"
            :key="`${filterName}-colors`"
          >
            <SfColor
              v-for="option in filters[filterName].options"
              :key="`${filterName}-${option.name}`"
              :data-cy="`category-filter_color_${option.name}`"
              :color="option.name"
              :selected="option.selected"
              class="filters__color"
              @click="option.selected = !option.selected"
            />
          </div>

          <div
           v-if="filters[filterName].type == 'range'"
           class="filter__prices"
           :key="`${filterName}-prices`"
          >
            <div v-for="option in filters[filterName].options">
              <label for="minPrice">
                Min
                <input id="minPrice" type="number" :value="option.min" @change="option.min = $event.target.valueAsNumber">
              </label>
              <br>
              <label for="maxPrice">
                Max
                <input id="maxPrice" type="number" :value="option.max" @change="option.max = $event.target.valueAsNumber">
              </label>
            </div>
          </div>

          <template v-else>
            <SfFilter
              v-for="option in filters[filterName].options"
              :key="`${filterName}-${option.name}`"
              :data-cy="`category-filter_${filterName}_${option.name}`"
              :label="filters[filterName].type == 'boolean' ? option.name == true ? 'yes' : 'no' : option.name"
              :selected="option.selected"
              class="filters__item"
              @change="option.selected = !option.selected"
            >
            </SfFilter>
          </template>
        </template>
      </template>
      <div class="filters__buttons">
        <SfButton
          @click="clearFilters"
          class="sf-button--full-width filters__button-clear"
        >Clear all</SfButton>
      </div>
    </div>

    <SfAccordion class="filters mobile-only">
      <slot name="categories-mobile"></slot>
      <template v-for="(label, filterName) in filtersMap">
        <SfAccordionItem
          v-if="filters[filterName]"
          :key="`filter-title-${filterName}`"
          :header="label"
          class="filters__accordion-item"
        >
          <SfFilter
            v-for="option in filters[filterName].options"
            :key="`${filterName}-${option.name}`"
            :label="option.name"
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

import { computed } from '@vue/composition-api';

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

    const filtersMap = computed(() => {
      if (props.filters) {
        return Object.keys(props.filters).reduce((obj, item) => {
          return { ...obj, [item]: props.filters[item].name};
        }, {});
      }
    });

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
      filtersMap,
      clearFilters,
      applyFilters
    };
  }
};
</script>
