## Home
*In core page there's almost no functionality, everything is in theme component, which definetely needs be replaced to core.*
### Props
No props
### Data
* 'latestProducts' - list of 20 latest products
* 'rootCategories` - list of root categories
### Methods

fetchData ({ store, route }) - should handle fetching data from `data`, should be outside of the component scope and optional 

### Hooks
#### beforeMount
Clears Vuex store entries that define current category by dispatching *'category/reset'* action. If app is launching in demo mode, onboarding info modal pops up. // demo stuff should be only in default theme
