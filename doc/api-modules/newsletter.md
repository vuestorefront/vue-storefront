# Newsletter module

The newsletter module is a set of mixins responsible for interacting with newsletter extension. You can find methods responsible for subscribing/unsubscribing/getting newsletter preferences.

## Content

#### subscribe
- [method] subscribe(email)

#### unsubscribe
- [method] unsubscribe(email)

#### newsletterPreferences
- [computed] newsletterPreferences

## Example

````javascript
// Inside Vue component
import {
  subscribe,
  unsubscribe,
  newsletterPreferences
} from '@vue-storefront/core/api/newsletter'

export default {
  //...other properties
  mixins: [
    subscribe,
    unsubscribe,
    newsletterPreferences
  ]
}
````
