# Bazaarvoice <Badge text="Enterprise" type="info" />

::: warning Paid feature
This feature is part of the Enterprise version. Please [contact our Sales team](https://www.vuestorefront.io/contact/sales) if you'd like to use it in your project.
:::

## Introduction

This package provides integration with [Bazaarvoice](https://www.bazaarvoice.com/).

Bazaarvoice (BV) provides two SDKs to integrate with their platform - `bvapi.js` and `bv.js`. The latter is recommended because of the performance improvements, and this is what is package uses under the hood.

We recommend reading [this documentation page](https://knowledge.bazaarvoice.com/wp-content/conversations-prr/en_US/display/integrating_content_bv_js.html) before using the package.

## Installation

Install the required package:

```sh
yarn add @vsf-enterprise/bazaarvoice
```

Register its Nuxt module with the following configuration:

```javascript
// nuxt.config.js

export default {
  buildModules: [
    ['@vue-storefront/nuxt', {
      useRawSource: {
        dev: [
          // other packages
          '@vsf-enterprise/bazaarvoice'
        ],
        prod: [
          // other packages
          '@vsf-enterprise/bazaarvoice'
        ]
      }
    }],
    [
      '@vsf-enterprise/bazaarvoice/nuxt',
      {
        clientName: '',
        siteId: '',
        environment: '',
        locale: ''
      }
    ],
  ]
};
```

* `clientName` - the lowercase name of the client provided by Bazaarvoice.
* `siteId` - the ID of the zone coming from the Bazaarvoice configuration hub. Defaults to `main_site`.
* `environment` - the deployment environment. Valid values are `production` and `staging`. Defaults to `staging`.
* `locale` - the locale used by the library, e.g. `en_US`.

::: warning Domain allowlist
For security reasons, Bazaarvoice uses an allowlist of allowed domains.
:::

::: tip Use localhost
If you get an `Uncaught Bazaarvoice is not configured for the domain` error in the console when working locally, try using `localhost` instead of the IP address provided by the Nuxt (eg. `localhost:3000`).
:::

## API

`@vsf-enterprise/bazaarvoice` exports few Vue.js components and `useBazaarvoice` composable.

### Composable

`useBazaarvoice` composable returns two computed properties:
* `loading` - indicates whether BV loader finished initialization.
* `settings` - object containing package configuration.

### Components

The following components are available, but some require additional features to be enabled. Please refer to Bazaarvoice documentation linked above for more information.

::: tip Performance matters
Bazaarvoice library has to load few resources and make some API calls. To improve the overall performance of the application, it's loaded only when one of the components from the library is used.
:::

#### `BvInlineRating`

The inline rating component displays the average rating and the total number of reviews. It can be used on a category or search page and will make only one call per page, even if used multiple times.

```html
<BvInlineRating productId="PRODUCT_ID" />
```

#### `BvQuestions`

Questions component displays questions and answers provided by the customers regarding the specific product.

```html
<BvQuestions productId="PRODUCT_ID" />
```

#### `BvRatingSummary`

The rating summary component (also called "fast stars") displays the average rating, the total number of reviews, and rating distribution when hovered.

```html
<BvRatingSummary
  productId="PRODUCT_ID"
  :onReviewsClick="callback"/>
```

When the component is clicked, it will scroll to `BvReviews` component. However, if the component is not visible by default (eg. is used in tab component), you can use `onReviewsClick` prop to pass a function to handle it.

#### `BvReviewHighlights`

The reviews highlights component shows a high-level summary of ratings and reviews.

```html
<BvReviewHighlights productId="PRODUCT_ID" />
```

#### `BvReviews`

The reviews component has a button to add a new review but also displays a list of ratings and reviews, rating distribution, and many more.

```html
<BvReviews productId="PRODUCT_ID" />
```

#### `BvSellerRatings`

Seller rating component displays up to 12 four- and five-star reviews. 

```html
<BvSellerRatings />
```
