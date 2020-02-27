<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <div class="product__gallery">
        <SfGallery
          class="gallery-mobile mobile-only"
          :image-width="375"
          :image-height="490"
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
        />
        <SfImage
          v-for="(image, i) in getProductGallery(product).splice(0, 2)" :key="i"
          :src="image.big"
          :width="590"
          :height="700"
          class="desktop-only"
        />
      </div>
      <div class="product__description">
        <SfSticky class="product-details">
          <div class="product-details__mobile-top">
            <div>
              <SfHeading
                :title="getProductName(product)"
                :level="1"
                class="sf-heading--no-underline sf-heading--left product-details__heading"
              />
              <div class="product-details__sub">
                <SfPrice
                  :regular="'$' + getProductPrice(product)"
                  class="sf-price--big product-details__sub-price"
                />
                <div class="product-details__sub-rating">
                  <SfRating :score="4" :max="5" />
                  <div class="product-details__sub-reviews desktop-only">
                    Read all 1 review
                  </div>
                  <div class="product-details__sub-reviews mobile-only">
                    (1)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="product-details__description desktop-only">
            Find stunning women cocktail and party dresses. Stand out in lace
            and metallic cocktail dresses and party dresses from all your
            favorite brands.
          </p>
          <div class="product-details__action">
            <button class="sf-action">Size guide</button>
          </div>
          <div class="product-details__section">
            <SfSelect
              v-if="options.size"
              :selected="configuration.size"
              @change="size => updateFilter({ size })"
              label="Size"
              class="sf-select--bordered product-details__attribute"
            >
              <SfSelectOption
                v-for="size in options.size"
                :key="size.value"
                :value="size.value"
              >
                <SfProductOption :label="size.label" />
              </SfSelectOption>
            </SfSelect>
            <SfSelect
              v-if="options.color"
              :selected="configuration.color"
              @change="color => updateFilter({ color })"
              label="Color"
              class="sf-select--bordered product-details__attribute"
            >
              <SfSelectOption
                v-for="color in options.color"
                :key="color.value"
                :value="color.value"
              >
                <SfProductOption :label="color.label" />
              </SfSelectOption>
            </SfSelect>
          </div>
          <div class="product-details__section">
            <SfAlert
              message="Low in stock"
              type="warning"
              class="product-details__alert mobile-only"
            />
            <SfAddToCart
              :stock="stock"
              v-model="qty"
              :disabled="loading"
              :canAddToCart="stock > 0"
              @click="addToCart(product, parseInt(qty))"
              class="product-details__add-to-cart"
            />
            <div class="product-details__action">
              <button class="sf-action">Save for later</button>
            </div>
            <div class="product-details__action">
              <button class="sf-action">Add to compare</button>
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
      v-if="product"
      :product="product"
      title="Match it with"
    />
    <InstagramFeed />
    <SfBanner
      title="Download our application to your mobile"
      image="/homepage/bannerD.png"
      class="banner-application sf-banner--left sf-banner--center desktop-only"
    >
      <template #subtitle>
        <div class="banner-application__subtitle">Fashion to Take Away</div>
      </template>
      <template #title>
        <h1 class="banner-application__title">
          Download our application to your&nbsp;mobile
        </h1>
      </template>
      <template #call-to-action>
        <div>
          <img
            class="banner-application__download"
            src="/homepage/google.png"
            alt=""
          />
          <img
            class="banner-application__download"
            src="/homepage/apple.png"
            alt=""
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
  SfBreadcrumbs
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed } from '@vue/composition-api';

import { useProduct, useCart } from '<%= options.composables %>';
import {
  getProductVariants,
  getProductName,
  getProductGallery,
  getProductPrice,
  getProductAttributes
} from '<%= options.helpers %>';

export default {
  name: 'Product',
  transition: 'fade',
  setup(props, context) {
    const qty = ref(1);
    const { slug } = context.root.$route.params;
    const { products, search } = useProduct();
    const { addToCart, loading } = useCart();

    search({ slug });

    const product = computed(() => getProductVariants(products.value, { master: true,
      attributes: context.root.$route.query })[0]);
    const options = computed(() => getProductAttributes(products.value, ['color', 'size']));
    const configuration = computed(() => getProductAttributes(product.value, ['color', 'size']));

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
      options,
      getProductName,
      getProductPrice,
      getProductGallery,
      qty,
      addToCart,
      loading
    };
  },
  components: {
    SfAlert,
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
@import "~@storefront-ui/shared/styles/variables";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.banner-application {
  min-height: 420px;
  max-width: 1040px;
  margin: auto;
  padding-right: calc(25% + 5rem);
  padding-left: 2.5rem;
  line-height: 1.6;
  &__title {
    margin: $spacer-big 0 0 0;
    font-size: $h1-font-size-desktop;
    font-weight: $h1-font-weight-desktop;
  }
  &__subtitle {
    color: #a3a5ad;
    font-family: $body-font-family-primary;
    font-size: $font-size-extra-big-desktop;
    font-weight: $body-font-weight-primary;
  }
  &__download {
    max-height: 47px;
    margin-top: $spacer-extra-big;
    & + & {
      margin-left: $spacer-big;
    }
  }
}
.breadcrumbs {
  padding: $spacer-big $spacer-extra-big $spacer-extra-big;
}
.gallery-mobile {
  $height-other: 240px;
  $height-iOS: 265px;
  height: calc(100vh - #{$height-other});
  @supports (-webkit-overflow-scrolling: touch) {
    height: calc(100vh - #{$height-iOS});
  }
  ::v-deep .sf-image {
    img {
      width: 100%;
    }
  }
  ::v-deep .sf-gallery__stage {
    width: 100%;
  }
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
    padding: 0 $spacer-big;
    @include for-desktop {
      margin-left: $spacer-big * 5;
    }
  }
}
.product-card {
  max-width: unset; // ?
  &:hover {
    @include for-desktop {
      box-shadow: 0px 4px 20px rgba(168, 172, 176, 0.19);
    }
  }
}
.product-carousel {
  margin: -20px -#{$spacer-big} -20px 0;
  @include for-desktop {
    margin: -20px 0;
  }
  ::v-deep .sf-carousel__wrapper {
    padding: 20px 0;
    @include for-desktop {
      padding: 20px;
      max-width: calc(100% - 216px);
    }
  }
}
.product-details {
  &__action {
    display: flex;
    margin: $spacer-big 0 ($spacer-big / 2);
    @include for-desktop {
      justify-content: flex-end;
    }
  }
  &__add-to-cart {
    margin-top: 1.5rem;
    @include for-desktop {
      margin-top: $spacer-extra-big;
    }
  }
  &__alert {
    margin-top: 1.5rem;
  }
  &__attribute {
    margin-bottom: $spacer-big;
  }
  &__description {
    margin: $spacer-extra-big 0 ($spacer-big * 3) 0;
    font-family: $body-font-family-secondary;
    font-size: $font-size-regular-mobile;
    line-height: 1.6;
    @include for-desktop {
      font-size: $font-size-regular-desktop;
    }
  }
  &__divider {
    margin-top: 30px;
  }
  &__heading {
    margin-top: $spacer-big;
    ::v-deep .sf-heading__title {
      font-size: $font-size-big-mobile;
      font-weight: $body-font-weight-primary;
      @include for-desktop {
        font-size: $h1-font-size-desktop;
        font-weight: $body-font-weight-secondary;
      }
    }
    @include for-desktop {
      margin-top: 0;
    }
  }
  &__mobile-bar {
    display: none;
    padding: $spacer-medium 0;
    box-sizing: border-box;
    .product--is-active & {
      display: block;
      @include for-desktop {
        display: none;
      }
    }
    @include for-desktop {
      display: none;
    }
  }
  &__mobile-top {
    display: flex;
    align-items: center;
    @include for-desktop {
      display: block;
    }
  }
  &__properties {
    margin-top: $spacer-big;
  }
  &__sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__sub-price {
    flex-basis: 100%;
    margin-top: $spacer-big / 4;
    @include for-desktop {
      flex-basis: auto;
      margin-top: $spacer-big / 2;
    }
  }
  &__sub-rating {
    display: flex;
    margin-top: $spacer-big / 2;
    @include for-desktop {
      margin-left: auto;
    }
  }
  &__sub-reviews {
    margin-left: 10px;
    font-size: 0.75rem;
  }
  &__section {
    border-bottom: 1px solid #f1f2f3;
    padding-bottom: 10px;
    @include for-desktop {
      border: 0;
      padding-bottom: 0;
    }
  }
  &__tabs {
    margin-top: $spacer-big;
    @include for-desktop {
      margin-top: 5 * $spacer-big;
    }
    p {
      margin: 0;
    }
  }
  &__review {
    padding-bottom: $spacer-big;
    @include for-desktop {
      padding-bottom: $spacer-extra-big;
      border-bottom: 1px solid $c-light;
    }
    & + & {
      padding-top: $spacer-extra-big;
      border-top: 1px solid $c-light;
      @include for-desktop {
        border-top: 0;
        padding-top: $spacer-extra-big;
      }
    }
  }
}
.product-property {
  padding: $spacer-small 0;
}
.section {
  padding-left: $spacer-big;
  padding-right: $spacer-big;
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}
/* SfAction or SfButton modifier */
.sf-action {
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  color: $c-text;
  font-family: $body-font-family-secondary;
  font-size: $font-size-regular-mobile;
  font-weight: $body-font-weight-secondary;
  line-height: 1.6;
  text-decoration: underline;
  cursor: pointer;
  @include for-desktop {
    font-size: $font-size-regular-desktop;
  }
}
</style>
