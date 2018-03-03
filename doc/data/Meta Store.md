# Meta Vuex Store

Meta store is just for managing the HTML Meta tags like title and description.

## State

```js
  state: {
    title: config.meta.shopName,
    description: config.meta.description,
    suffix: config.meta.titleSuffix
  },
```

Meta state is typically modified by page components by [meta mixin](https://github.com/DivanteLtd/vue-storefront/blob/master/core/lib/meta.js). As You create the page, simple include the [meta mixin](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/pages/Category.vue#L177) and call [`setMeta`](https://github.com/DivanteLtd/vue-storefront/blob/1793aaa7afc89b3f08e443f40dd5c6131dd477ba/core/pages/Category.vue#L211).

The meta state data:
- `title` - page title as rendered withn the `head > title`
- `description` - the `meta description` rendered within the `head` on the current Page
- `suffix` - static suffix added to each subsequent Page title

## Actions 

The meta store provides following public actions:

### `set ({commit, state}, meta)`
Meta object structure is very easy to understand:

```js
{
  title: 'Curent page title',
  description: 'Current page meta description',
  suffix: 'Current page suffix, when no provided then config default is used'
}
```

## Getters

The meta store exposes jus one getter for getting the meta object:

```js
 meta (state) {
    return {
      title: state.title,
      description: state.description
    }
  }
```