# `icmaa-meta` module

Set custom store and logic for meta- and seo information.

In `theme/resource/meta/` you need to add files like `head-uk.ts` to add a store-view specific meta file where you can extend the default meta infos of `theme/resource/meta/head.ts`. This data will be loaded on serverPrefetch into the root state and loaded in your layout.

VSF uses `vue-meta` as meta-tag handler, [read the docs](https://vue-meta.nuxtjs.org/) to learn more about it.

## Config

1. Fetch state in default layout file of your theme (e.g. `Default.vue`) via `serverPrefetch()` like `this.$store.dispatch('icmaaMeta/load')`. Be sure to return a `promise` in `serverPrefetch()`, so if you fetch multiple actions it should look like:
   ```javascript
   return Promise.all([
     this.fetchMetaData(), // Method which fetches the data via vuex store
     this.otherData()
   ])
   ```
2. Import meta info via getter like:
   ```javascript
   methods: {
     ...mapGetters({ getMetaData: 'icmaaMeta/getData' })
   },
   metaInfo () {
     return this.getMetaData()
   }
   ```

## `head-*.ts` files

Each file in `theme/resource/meta/` should return a JSON object following the `MetaInfo` interface of `vue-meta`.
To extend a parent or default value you just need to overwrite it by it's key.

If you like to update, add or remove nested array values like in "meta" or "script" use the following syntax:
```javascript
{
  …
  title: 'Overwrite default title',
  add: [
    {
      type: 'meta',
      data: { name: 'lorem-ipsum', content: 'Lorem ispum sit dolor.' }
    }
  ],
  update: [
    {
      type: 'meta',
      find: { name: 'description' },
      data: { vmid: 'description', name: 'description', content: 'Other description' }
    }
  ],
  remove: [
    {
      type: 'meta',
      find: { charset: 'utf-8' }
    }
  ],
  …
}
```

## Todo

[ ] Make config via `icmaa-cms` available
