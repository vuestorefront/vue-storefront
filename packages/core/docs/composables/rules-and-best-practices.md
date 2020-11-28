# Composables

# Rules

1. Composables can't work without the access to the component context therefore you can run them only inside the `setup()` method of Vue.js component. `asyncData` , `data`, and `methods` will also work but there are some known issues.
2. You always have to provide a unique identifier for each composable (except `useUser`, `useWishlist` and `useCart` that always share their state) within your app (eg `useProduct('identifier')`)