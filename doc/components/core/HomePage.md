# Core Home Page

*In core page there's almost no functionality, everything is in theme component, which definetely needs be replaced to core.*

### Props
No props

### Data

`rootCategories` category list to be used for your own custom home page

### Methods
No methods

### Events

`home-after-load` event can be used to populate the vuex `store` with additional data required by SSR.

#### beforeMount
Clears Vuex store entries that define current category by dispatching `category/reset` action. 
