<template>
  <div class="navbar__main">
    <div class="navbar__counter">
      <span class="navbar__label desktop-only">{{ $t('Products found') }}: </span>
      <span class="desktop-only">{{ pagination.totalItems }}</span>
      <span class="navbar__label smartphone-only">{{ pagination.totalItems }} {{ $t('Items') }}</span>
    </div>

    <div v-e2e="'category-header-views'" class="navbar__view">
      <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
      <SfIcon
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
  </div>
</template>

<script>
import { useUiHelpers, useUiState } from '~/composables';
import {
  SfButton,
  SfIcon,
  SfSelect
} from '@storefront-ui/vue';

export default {
  name: 'CategoryPageHeader',
  components: {
    SfButton,
    SfIcon,
    SfSelect
  },
  props: {
    pagination: {
      type: Object
    }
  },
  setup() {
    const th = useUiHelpers();
    const uiState = useUiState();

    return {
      ...uiState,
      th
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
