# Review module

The review module as name suggests is a set of mixins responsible for interacting with Review. You can find methods responsible for adding and getting reviews for product.

## Content

#### addReview
- [method] addReview(review)

#### reviews
- [computed] reviews

## Example

````javascript
// Inside Vue component
import {
  reviews,
  addReview
} from '@vue-storefront/core/modules/review/features'

export default {
  //...other properties
  mixins: [
    reviews,
    addReview
  ]
}
````
