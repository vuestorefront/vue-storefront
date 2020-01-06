# Attribute Vuex Store

Attribute Store is designed to handle all actions related to attributes management.

## State

```js
  state: {
    list_by_code: {},
    list_by_id: {},
    labels: {}
  },
```

As we're using the attributes dictionary for the product management in a very similar way as Magento ([EAV model](http://www.xpertdeveloper.com/2010/10/what-is-eav-model-in-magento/)), we're operating on the attributes, attribute types, and dictionaries.

Attributes are **explicitly** loaded by the user by calling the `attribute/list` method. For example, when you're going to work with customizable attributes of the product, or to work on variants, you need to prefetch the attributes metadata:

```js
this.$store.dispatch('attribute/list', {
  filterValues: [true],
  filterField: 'is_user_defined',
});
```

This is an example from [product compare feature](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/pages/Compare.vue).

The attribute state data:

- `list_by_code` - This is a dictionary where you can get the specific attribute just by accessing the `list_by_code['color']` etc.
- `list_by_id` - This is a dictionary where you can get the specific attribute just by accessing the `list_by_id[123]` etc.
- `labels` - The preloaded labels of attribute values (the V in EAV).

## Actions

The attribute store provides the following public actions:

### `list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0 })``

This method is used to load the attributes metadata. `filterValues` is an array of multiple values like: `['color', 'size']` and the `filterField` is the attribute field to compare the `filterValues` against. Usually, it is a `attribute_code` or `attribute_id`. The `size` and `start` are just used to limit the list.

## Helpers

Attribute module exports one very popular helper method:

### `export function optionLabel (state, { attributeKey, searchBy = 'code', optionId })`

This is used to get the label for specific `optionId`. For example, when the user filters products and uses the 165 attribute_value we can call `optionLabel( { attributeKey: 'color', optionId: 165 })` to get back 'Red' label.

## Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
export default {
  attributeListByCode: state => state.list_by_code,
  attributeListById: state => state.list_by_id,
};
```
