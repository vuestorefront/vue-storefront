<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <div class="product__gallery">
        <!-- TODO: replace example images with the getter, wait for SfGallery fix by SFUI team: https://github.com/DivanteLtd/storefront-ui/issues/1074 -->
        <!-- <SfGallery
          class="gallery-mobile mobile-only"
          :images="[
            {
              mobile: { url: '/productpage/productM.jpg' },
              desktop: { url: '/productpage/productM.jpg' },
              big: { url: '/productpage/productM.jpg' }
            },
            {
              mobile: { url: '/productpage/productM.jpg' },
              desktop: { url: '/productpage/productM.jpg' },
              big: { url: '/productpage/productM.jpg' }
            }
          ]"
        /> -->
        <SfImage
          v-for="(image, i) in productGetters.getGallery(product).splice(0, 2)" :key="i"
          :src="image.big"
          :width="590"
          :height="700"
        />
      </div>
      <div class="product__description">
        <SfSticky class="product-details">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="1"
            class="sf-heading--no-underline sf-heading--left product-details__heading"
          />
          <div class="product-details__sub">
            <SfPrice
              :regular="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
              :special="productGetters.getFormattedPrice(productGetters.getPrice(product).special)"
            />
            <div class="product-details__sub-rating">
              <SfRating :score="4" :max="5" />
              <SfButton data-cy="product-btn_read-all" class="product-details__sub-reviews sf-button--text desktop-only">
                Read all reviews
              </SfButton>
              <div class="product-details__sub-reviews mobile-only">
                (1)
              </div>
            </div>
          </div>
          <p class="product-details__description desktop-only">
            Find stunning women cocktail and party dresses. Stand out in lace
            and metallic cocktail dresses and party dresses from all your
            favorite brands.
          </p>
          <div class="product-details__action desktop-only">
            <SfButton data-cy="product-btn_size-guide" class="sf-button--text color-secondary"
              >Size guide</SfButton
            >
          </div>
          <!-- TODO: add size selector after design is added -->
          <div class="product-details__section desktop-only" >
            <SfSelect
              data-cy="product-select_size"
              v-if="options.size"
              :selected="configuration.size"
              @change="size => updateFilter({ size })"
              label="Size"
              class="sf-select--underlined product-details__attribute"
            >
              <SfSelectOption
                v-for="size in options.size"
                :key="size.value"
                :value="size.value"
              >
                <SfProductOption :label="size.label" />
              </SfSelectOption>
            </SfSelect>
            <!-- TODO: add color picker after PR done by SFUI team -->
            <div v-if="options.color" class="product-details__colors desktop-only">
            <p class="product-details__color-label">Color:</p>
            <!-- TODO: handle selected logic differently as the selected prop for SfColor is a boolean -->
            <SfColor
              data-cy="product-color_update"
              v-for="(color, i) in options.color"
              :key="i"
              :color="color.value"
              class="product-details__color"
              @click="updateFilter({color})"
            />
          </div>
          </div>
          <div class="product-details__section desktop-only">
            <SfAddToCart
              data-cy="product-cart_add"
              :stock="stock"
              v-model="qty"
              :disabled="loading"
              :canAddToCart="stock > 0"
              @click="addToCart(product, parseInt(qty))"
              class="product-details__add-to-cart"
            />
            <div class="product-details__action">
              <SfButton data-cy="product-btn_save-later" class="sf-button--text color-secondary"
                >Save for later</SfButton
              >
            </div>
            <div class="product-details__action">
              <SfButton data-cy="product-btn_add-to-compare" class="sf-button--text color-secondary"
                >Add to compare</SfButton
              >
            </div>
          </div>
          <SfTabs class="product-details__tabs" :openTab="2">
            <SfTab title="Description">
              <div>
                <p>
                  The Karissa V-Neck Tee features a semi-fitted shape that's
                  flattering for every figure. You can hit the gym with
                  confidence while it hugs curves and hides common "problem"
                  areas. Find stunning women's cocktail dresses and party
                  dresses.
                </p>
              </div>
              <div class="product-details__properties">
                <SfProperty
                  v-for="(property, i) in properties"
                  :key="i"
                  :name="property.name"
                  :value="property.value"
                  class="product-property"
                />
              </div>
            </SfTab>
            <SfTab title="Read reviews">
              <SfReview
                class="product-details__review"
                v-for="(review, i) in reviews"
                :key="i"
                :author="review.author"
                :date="review.date"
                :message="review.message"
                :rating="review.rating"
                :max-rating="5"
              />
            </SfTab>
            <SfTab title="Additional Information">
              <SfHeading
                title="Brand"
                :level="3"
                class="sf-heading--no-underline sf-heading--left"
              />
              <p>
                <u>Brand name</u> is the perfect pairing of quality and design.
                This label creates major everyday vibes with its collection of
                modern brooches, silver and gold jewellery, or clips it back
                with hair accessories in geo styles.
              </p>
            </SfTab>
          </SfTabs>
        </SfSticky>
      </div>
    </div>
    <RelatedProducts
      :products="relatedProducts"
      :loading="relatedLoading"
      title="Match it with"
    />
    <InstagramFeed />
    <SfBanner
      image="/homepage/bannerD.png"
      subtitle="Fashion to Take Away"
      title="Download our application to your mobile"
      class="sf-banner--left desktop-only banner-app"
    >
      <template #call-to-action>
        <div class="banner-app__call-to-action">
          <SfImage
            class="banner-app__image"
            src="/homepage/google.png"
            :width="191"
            :height="51"
            alt="Google Play"
          />
          <SfImage
            class="banner-app__image"
            src="/homepage/apple.png"
            :width="174"
            :height="57"
            alt="App Store"
          />
        </div>
      </template>
    </SfBanner>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfProductOption,
  SfAddToCart,
  SfTabs,
  SfGallery,
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
import { useProduct, useCart, productGetters } from '<%= options.composables %>';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Product',
  transition: 'fade',
  setup(props, context) {
    const qty = ref(1);
    const { id } = context.root.$route.params;
    const { products, search } = useProduct('products');
    const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addToCart, loading } = useCart();

    const product = computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]);
    const options = computed(() => productGetters.getAttributes(products.value, ['color', 'size']));
    const configuration = computed(() => productGetters.getAttributes(product.value, ['color', 'size']));
    const categories = computed(() => productGetters.getCategoryIds(product.value));

    onSSR(async () => {
      await search({ id });
      await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
    });

    const updateFilter = (filter) => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: { ...configuration.value,
          ...filter }
      });
    };

    return {
      updateFilter,
      configuration,
      product,
      // TODO: Temporary. Product search function returns products with all available variants as a flat array. Because of that it omits query limitation.
      relatedProducts: relatedProducts.value.filter((relatedProduct, i) => i < 8),
      relatedLoading,
      options,
      qty,
      addToCart,
      loading,
      productGetters
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
    SfProductOption,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts
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
      reviews: [
        {
          author: 'Jane D.Smith',
          date: 'April 2019',
          message:
            'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can\'t comment on interlation as I had an electrition instal it. Would recommend',
          rating: 4
        },
        {
          author: 'Mari',
          date: 'Jan 2018',
          message:
            'Excellent light output from this led fitting. Relatively easy to fix to the ceiling,but having two people makes it easier, to complete the installation. Unable to comment on reliability at this time, but I am hopeful of years of use with good light levels. Excellent light output from this led fitting. Relatively easy to fix to the ceiling,',
          rating: 5
        }
      ],
      detailsIsActive: false,
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
@import "~@storefront-ui/vue/styles";
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.section {
  padding: 0 var(--spacer-xl);
  @include for-desktop {
    padding: 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__gallery,
  &__description {
    flex: 1;
  }
  &__description {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
      margin: 0 0 0 calc(var(--spacer-xl) * 5);
    }
  }
}
.product-property {
  margin: var(--spacer-xs) 0;
}
.product-details {
  &__heading {
    margin: var(--spacer-lg) 0 0 0;
    @include for-desktop {
      margin: var(--spacer-base) 0;
    }
  }
  &__sub {
    @include for-desktop {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__sub-rating {
    display: flex;
    align-items: center;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      flex-direction: column;
      align-items:flex-start;
      margin: 0;
    }
  }
    &__colors {
    @include font(
      --product-color-font,
      var(--font-normal),
      var(--font-lg),
      1.6,
      var(--font-family-secondary)
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
  &__sub-reviews {
    margin: var(--spacer-2xs) 0 0 0;
    font-size: var(--font-xs);
  }
  &__section {
    border: 1px solid var(--c-light);
    border-width: 0 0 1px 0;
    padding: 0 0 0.625rem 0;
    @include for-desktop {
      border: 0;
      padding: 0;
    }
  }
  &__action {
    display: flex;
    &:not(:last-of-type) {
      margin: var(--spacer-xl) 0 var(--spacer-base);
    }
    @include for-desktop {
      justify-content: flex-end;
    }
  }
  &__add-to-cart {
    margin: var(--spacer-base) 0 0 0;
    @include for-desktop {
      margin: var(--spacer-2xl) 0 0 0;
    }
  }
  &__alert {
    margin: var(--spacer-base) 0 0 0;
  }
  &__attribute {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__description {
    margin: var(--spacer-xl) 0;
    font-family: var(--font-family-secondary);
    font-size: var(--font-base);
    color: var(--c-dark-variant);
    line-height: 1.6;
    @include for-desktop {
      font-size: var(--font-base);
    }
  }
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__tabs {
    --tabs-title-padding: var(--spacer-sm) 0;
    --tabs-content-tab-padding: var(--spacer-sm) 0;
    margin: var(--spacer-lg) 0 0 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__review {
    padding: var(--spacer-xl) 0;
    border: 1px solid var(--c-light);
    border-width: 0 0 1px 0;
  }
}
.product-carousel {
  margin: 0 calc(var(--spacer-xl) * -1) 0 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0;
    --carousel-padding: var(--spacer-xl);
    --carousel-max-width: calc(100% - 13.5rem);
  }
}
.product-card {
  &:hover {
    --product-card-box-shadow: 0 4px 20px rgba(168, 172, 176, 0.19);
  }
}
.images-grid {
  max-width: 60rem;
  margin: 0 auto;
  &__row {
    display: flex;
    & + & {
      margin: calc(var(--spacer-xl) / 2) 0 0 0;
      @include for-desktop {
        margin: var(--spacer-xl) 0 0 0;
      }
    }
  }
  &__col {
    flex: 1;
    margin: 0;
    & + & {
      margin: 0 0 0 calc(var(--spacer-xl) / 2);
      @include for-desktop {
        margin: 0 0 0 var(--spacer-xl);
      }
    }
  }
}
.banner-app {
  --banner-title-margin: var(--spacer-xl) 0 0 0;
  --banner-title-font-size: var(--h1-font-size);
  --banner-subtitle-font-size: var(--font-size-extra-big);
  min-height: 26.25rem;
  max-width: 65rem;
  margin: 0 auto;
  padding-right: calc(25% + 5rem);
  padding-left: 2.5rem;
  &__call-to-action {
    display: flex;
    margin: var(--space-big) 0 0 0;
  }
  &__image {
    width: 22%;
    & + & {
      margin: 0 0 0 var(--spacer-xl);
    }
  }
}
</style>
