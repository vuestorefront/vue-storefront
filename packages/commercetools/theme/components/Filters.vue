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
              :key="`${filterName}-${option.label}`"
              :data-cy="`category-filter_color_${option.value}`"
              :color="option.value"
              :selected="option.selected"
              class="filters__color"
              @click="option.selected = !option.selected"
            />
          </div>
          <template v-else>
            <SfFilter
              v-for="option in filters[filterName].options"
              :key="`${filterName}-${option.label}`"
              :data-cy="`category-filter_${filterName}_${option.value}`"
              :label="filters[filterName].type == 'BooleanAttribute' ? 'yes' : option.label"
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
      <template v-for="(label, filterName) in filtersMap">
        <SfAccordionItem
          v-if="filters[filterName]"
          :key="`filter-title-${filterName}`"
          :header="label"
          class="filters__accordion-item"
        >
          <SfFilter
            v-for="option in filters[filterName].options"
            :key="`${filterName}-${option.label}`"
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
      commonSize: 'Size',
      color: 'Color',
      style: 'Style',
      madeInItaly: 'Made In Italy',
      designer: 'Designer'
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
