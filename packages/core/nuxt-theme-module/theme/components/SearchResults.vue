<template>
  <div>
    <SfMegaMenu
      :visible="toggleSearch"
      title="Search results"
      class="search"
    >
      <transition name="sf-fade" mode="out-in">
        <div v-if="products.length > 0" class="search__wrapper-results" key="results">
          <SfMegaMenuColumn title="Categories" class="sf-mega-menu-column--pined-content-on-mobile search__categories">
            <SfList>
              <SfListItem v-for="(category, key) in categories.items" :key="key">
                <SfMenuItem :label="category.label" @click="goToPath(`/c/women/${category.slug}`)"/>
              </SfListItem>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="Product suggestions" class="sf-mega-menu-column--pined-content-on-mobile search__results">
            <template #title="{title}">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              />
            </template>
            <SfScrollable class="results--desktop desktop-only" show-text="" hide-text="">
              <div class="results-listing">
                <SfProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  class="result-card"
                  :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
                  :score-rating="productGetters.getAverageRating(product)"
                  :reviews-count="7"
                >
                  <template #image>
                    <SfButton
                      class="sf-product-card__link sf-button--pure"
                      @click="goToPath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
                    >
                      <SfImage
                        class="sf-product-card__image"
                        :src="productGetters.getCoverImage(product)"
                        :alt="productGetters.getName(product)"
                      />
                    </SfButton>
                  </template>
                      <template #title>
                      <SfButton
                        class="sf-product-card__link sf-button--pure"
                        @click="goToPath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
                      >
                        <p class="sf-product-card__title">
                          {{ productGetters.getName(product) }}
                        </p>
                      </SfButton>
                    </template>
                </SfProductCard>
              </div>
            </SfScrollable>
            <div class="results--mobile smartphone-only">
                <SfProductCard
                  v-for="(product, index) in products"
                  :key="index"
                  :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
                  :score-rating="productGetters.getAverageRating(product)"
                  :reviews-count="7"
                >
                  <template #image>
                    <SfButton
                      class="sf-product-card__link sf-button--pure"
                      @click="goToPath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
                    >
                      <SfImage
                        class="sf-product-card__image"
                        :src="productGetters.getCoverImage(product)"
                        :alt="productGetters.getName(product)"
                      />
                    </SfButton>
                  </template>
                      <template #title>
                      <SfButton
                        class="sf-product-card__link sf-button--pure"
                        @click="goToPath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
                      >
                        <h3 class="sf-product-card__title">
                          {{ productGetters.getName(product) }}
                        </h3>
                      </SfButton>
                    </template>
                </SfProductCard>
              </div>
            <SfButton class="sf-button--text see-all desktop-only" @click="goToPath('/c/women/women-clothing')">See all results</SfButton>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton class="action-buttons__button color-secondary" @click="goToPath('/c/women/women-clothing')">See all results</SfButton>
            <SfButton class="action-buttons__button color-light" @click="$emit('closeSearchResults')">Cancel</SfButton>
          </div>
        </div>
        <div v-else class="before-results" key="no-results">
          <SfImage src="/error/error.svg" class="before-results__picture" alt="error"/>
          <p class="before-results__paragraph">You haven’t searched for items yet.</p>
          <p class="before-results__paragraph">Let’s start now – we’ll help you.</p>
          <SfButton class="before-results__button color-secondary smartphone-only" @click="$emit('closeSearchResults')">Go back</SfButton>
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfBanner,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
  SfOverlay,
  SfImage
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@vue/composition-api';
import { productGetters, facetGetters } from '<%= options.generate.replace.composables %>';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfBanner,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SfOverlay,
    SfImage
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    result: {
      type: Object
    }
  },
  setup(props, { emit, root }) {
    const toggleSearch = ref(props.visible);
    const products = computed(() => facetGetters.getProducts(props.result));
    const categories = computed(() => facetGetters.getCategoryTree(props.result));

    watch(() => props.visible, (newVal) => {
      toggleSearch.value = newVal;
      if (toggleSearch.value) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    });

    const goToPath = (path) => {
      emit('closeSearchResults');
      root.$router.push(`${path}`);
    };

    return {
      toggleSearch,
      productGetters,
      products,
      categories,
      goToPath
    };
  }
};
</script>

<style lang="scss" scoped>

.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__results {
    flex: 1
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 30rem;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem ;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
    &:first-child {
      margin-bottom: var(--spacer-sm);
    }
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-2xs) 0;
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding-bottom: var(--spacer-xl);
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 21.875rem;
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}

</style>
