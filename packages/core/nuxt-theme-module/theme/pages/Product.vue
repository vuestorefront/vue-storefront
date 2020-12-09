<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <SfGallery :images="productGallery" class="product__gallery" />
      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
            :special="productGetters.getFormattedPrice(productGetters.getPrice(product).special)"
          />
          <div>
            <div class="product__rating">
              <SfRating
                :score="averageRating"
                :max="5"
              />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton data-cy="product-btn_read-all" class="sf-button--text">Read all reviews</SfButton>
          </div>
        </div>
        <div>
          <p class="product__description desktop-only">
            {{ description }}
          </p>
          <SfButton data-cy="product-btn_size-guide" class="sf-button--text desktop-only product__guide">
            Size guide
          </SfButton>
          <SfSelect
            data-cy="product-select_size"
            v-if="options.size"
            v-model="configuration.size"
            label="Size"
            class="sf-select--underlined product__select-size"
            :required="true"
          >
            <SfSelectOption
              v-for="size in options.size"
              :key="size.value"
              :value="size.value"
            >
              {{size.label}}
            </SfSelectOption>
          </SfSelect>
          <div v-if="options.color" class="product__colors desktop-only">
            <p class="product__color-label">Color:</p>
            <SfColor
              data-cy="product-color_update"
              v-for="(color, i) in options.color"
              :key="i"
              :color="color.value"
              class="product__color"
              @click="updateFilter({color})"
            />
          </div>
          <SfAddToCart
            data-cy="product-cart_add"
            :stock="stock"
            v-model="qty"
            :disabled="loading"
            :canAddToCart="stock > 0"
            class="product__add-to-cart"
            @click="addToCart(product, parseInt(qty))"
          />
          <SfButton data-cy="product-btn_save-later" class="sf-button--text desktop-only product__save">
            Save for later
          </SfButton>
          <SfButton data-cy="product-btn_add-to-compare" class="sf-button--text desktop-only product__compare">
            Add to compare
          </SfButton>
        </div>
        <SfTabs :open-tab="1" class="product__tabs">
          <SfTab data-cy="product-tab_description" title="Description">
            <div class="product__description">
                The Karissa V-Neck Tee features a semi-fitted shape that's
                flattering for every figure. You can hit the gym with
                confidence while it hugs curves and hides common "problem"
                areas. Find stunning women's cocktail dresses and party
                dresses.
            </div>
            <SfProperty
              v-for="(property, i) in properties"
              :key="i"
              :name="property.name"
              :value="property.value"
              class="product__property"
            >
              <template v-if="property.name === 'Category'" #value>
                <SfButton class="product__property__button sf-button--text">
                  {{ property.value }}
                </SfButton>
              </template>
            </SfProperty>
          </SfTab>
          <SfTab title="Read reviews" data-cy="product-tab_reviews">
            <SfReview
              v-for="review in reviews"
              :key="reviewGetters.getReviewId(review)"
              :author="reviewGetters.getReviewAuthor(review)"
              :date="reviewGetters.getReviewDate(review)"
              :message="reviewGetters.getReviewMessage(review)"
              :max-rating="5"
              :rating="reviewGetters.getReviewRating(review)"
              :char-limit="250"
              read-more-text="Read more"
              hide-full-text="Read less"
              class="product__review"
            />
          </SfTab>
          <SfTab
            title="Additional Information"
            data-cy="product-tab_additional"
            class="product__additional-info"
          >
          <div class="product__additional-info">
            <p class="product__additional-info__title">Brand</p>
            <p>{{ brand }}</p>
            <p class="product__additional-info__title">Take care of me</p>
            <p class="product__additional-info__paragraph">
              Just here for the care instructions?
            </p>
            <p class="product__additional-info__paragraph">
              Yeah, we thought so
            </p>
            <p>{{ careInstructions }}</p>
          </div>
          </SfTab>
        </SfTabs>
      </div>
    </div>
    <RelatedProducts
      :products="relatedProducts"
      :loading="relatedLoading"
      title="Match it with"
    />
    <InstagramFeed />
    <MobileStoreBanner />
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed } from '@vue/composition-api';
import { useProduct, useCart, productGetters, useReview, reviewGetters } from '<%= options.generate.replace.composables %>';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';

export default {
  name: 'Product',
  transition: 'fade',
  setup(props, context) {
    const qty = ref(1);
    const { id } = context.root.$route.params;
    const { products, search } = useProduct('products');
    const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addToCart, loading } = useCart();
    const { reviews: productReviews, search: searchReviews } = useReview('productReviews');

    const product = computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]);
    const options = computed(() => productGetters.getAttributes(products.value, ['color', 'size']));
    const configuration = computed(() => productGetters.getAttributes(product.value, ['color', 'size']));
    const categories = computed(() => productGetters.getCategoryIds(product.value));
    const reviews = computed(() => reviewGetters.getItems(productReviews.value));

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
      mobile: { url: img.small },
      desktop: { url: img.normal },
      big: { url: img.big }
    })));

    onSSR(async () => {
      await search({ id });
      await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      await searchReviews({ productId: id });
    });

    const updateFilter = (filter) => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          ...configuration.value,
          ...filter
        }
      });
    };

    return {
      updateFilter,
      configuration,
      product,
      reviews,
      reviewGetters,
      averageRating: computed(() => productGetters.getAverageRating(product.value)),
      totalReviews: computed(() => productGetters.getTotalReviews(product.value)),
      relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      relatedLoading,
      options,
      qty,
      addToCart,
      loading,
      productGetters,
      productGallery
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    MobileStoreBanner
  },
  data() {
    return {
      stock: 5,
      properties: [
        {
          name: 'Product Code',
          value: '578902-00'
        },
        {
          name: 'Category',
          value: 'Pants'
        },
        {
          name: 'Material',
          value: 'Cotton'
        },
        {
          name: 'Country',
          value: 'Germany'
        }
      ],
      description: 'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      detailsIsActive: false,
      brand:
          'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      breadcrumbs: [
        {
          text: 'Home',
          route: {
            link: '#'
          }
        },
        {
          text: 'Category',
          route: {
            link: '#'
          }
        },
        {
          text: 'Pants',
          route: {
            link: '#'
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
