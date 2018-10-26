# Vue Storefront refactoring plan for modules

We are slowly refactoring Vue Storefront code to modules. You can learn about modules and how to make them [here](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md). 


# Backward compatibility

It's important to keep the old api in core/components folder. You can port the new (module) API to the old ona so the old default theme will still work. Microcart component is a good example of such porting.

````js
// Core dependecies
import { Microcart } from '@vue-storefront/core/modules/cart/components/Microcart.ts'

export default {
  methods: {
    closeMicrocart () {
      // Method renamed to 'toggleMicrocart'
      this.toggleMicrocart()
    }
  },
  mixins: [
    Microcart
  ]
}
````

As you can see we are importing new Microcart comp0nent from module and porting it's API to the old one. If you are changing the API during refactoring to modules please take care of this porting
