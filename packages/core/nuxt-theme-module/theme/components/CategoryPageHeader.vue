<template>
  <div class="navbar__main">
    <LazyHydrate on-interaction>
      <SfButton
        class="sf-button--text navbar__filters-button"
        :aria-label="$t('Filters')"
        @click="toggleFilterSidebar"
      >
        <SfIcon
          size="24px"
          color="dark-secondary"
          icon="filter2"
          class="navbar__filters-icon"
        />
        {{ $t('Filters') }}
      </SfButton>
    </LazyHydrate>

    <div class="navbar__sort desktop-only">
      <span class="navbar__label">{{ $t('Sort by') }}:</span>
      <LazyHydrate on-interaction>
        <SfSelect
          :value="sortBy.selected"
          :placeholder="$t('Select sorting')"
          class="navbar__select"
          @input="th.changeSorting"
        >
          <SfSelectOption
            v-for="option in sortBy.options"
            :key="option.id"
            :value="option.id"
            class="sort-by__option"
          >
            {{ option.value }}
          </SfSelectOption
          >
        </SfSelect>
      </LazyHydrate>
    </div>

    <div class="navbar__counter">
      <span class="navbar__label desktop-only">{{ $t('Products found') }}: </span>
      <span class="desktop-only">{{ pagination.totalItems }}</span>
      <span class="navbar__label smartphone-only">{{ pagination.totalItems }} {{ $t('Items') }}</span>
    </div>

    <div class="navbar__view">
      <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
      <SfIcon
        v-e2e="'tiles-icon'"
        class="navbar__view-icon"
        :color="isCategoryGridView ? 'black' : 'dark-secondary'"
        icon="tiles"
        size="12px"
        role="button"
        :aria-label="$t('Change to grid view')"
        :aria-pressed="isCategoryGridView"
        @click="changeToCategoryGridView"
      />
      <SfIcon
        v-e2e="'list-icon'"
        class="navbar__view-icon"
        :color="!isCategoryGridView ? 'black' : 'dark-secondary'"
        icon="list"
        size="12px"
        role="button"
        :aria-label="$t('Change to list view')"
        :aria-pressed="!isCategoryGridView"
        @click="changeToCategoryListView"
      />
    </div>
    <LazyHydrate when-idle>
      <FiltersSidebar @close="toggleFilterSidebar"/>
    </LazyHydrate>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { useUiHelpers, useUiState } from '~/composables';
import { useFacet, facetGetters } from '<%= options.generate.replace.composables %>';
import FiltersSidebar from '~/components/FiltersSidebar';
import {
  SfButton,
  SfIcon,
  SfSelect
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'CategoryPageHeader',
  components: {
    SfButton,
    SfIcon,
    SfSelect,
    LazyHydrate,
    FiltersSidebar
  },
  props: {
    pagination: {
      type: Object
    }
  },
  setup() {
    const th = useUiHelpers();
    const { toggleFilterSidebar, isCategoryGridView, changeToCategoryGridView, changeToCategoryListView } = useUiState();
    const { result } = useFacet();

    const sortBy = computed(() => facetGetters.getSortOptions(result.value));
    const facets = computed(() => facetGetters.getGrouped(result.value, ['color', 'size']));

    return {
      th,
      sortBy,
      facets,
      toggleFilterSidebar,
      isCategoryGridView,
      changeToCategoryGridView,
      changeToCategoryListView
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__main {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}
</style>
