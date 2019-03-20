# CMS Prismic data module
Now you can plug headless CMS to your vue storefront

#BEFORE USE!
1. Make sure that in `vue-storefront-api` repo, the `cms-prismic` extension is installed
2. Add routes to your config/local.json file ( if you don't have one, copy default.json and name it local.json )
```
"prismic": {
      "byType": "http://localhost:8080/api/ext/cms-prismic/index/?type={{type}}",
      "byTag": "http://localhost:8080/api/ext/cms-prismic/index/?tags={{orderings}}",
      "contentId": "http://localhost:8080/api/ext/cms-prismic/index/?id={{contentId}}",
      "contentIdFilter": "http://localhost:8080/api/ext/cms-prismic/index/?id={{contentId}}&filter={{filter}}&filter_option={{filterOption}}"
    }
```
#To display Cms data
**First fetch data to store (vuex) you want,** using prismic store like this:

`store.dispatch('prismic/load', {type: 'cms_page'}`

Look on second parameter of store.dispatch, it is your content identifier
You can use (note that parameters don't mix):
1. contentId 
Prismic data Id
fetch like this: `store.dispatch('prismic/load', {contentId: 'W5oNzSAAANpzjTfA'}`

2. Type
Type of prismic data -> can be multiple documents
fetch like this: `store.dispatch('prismic/load', {type: 'cms_page'}`

3. Tag
Search by one of tag of prismic documents tags 
fetch like this: `store.dispatch('prismic/load', {tag: 'sale'}`

**Then use the data in components using contentMap getter**
1. contentId `this.$store.getters['prismic/contentMap']['W5oNzSAAANpzjTfA']`
2. type `this.$store.getters['prismic/contentMap']['cms_page']`
3. tag **NOTE the # sign** before tag name `this.$store.getters['prismic/contentMap']['#sale']`

**example of use:**
```
// fetching data
mounted () {
 this.$store.dispatch('prismic/load', {
   type: this.type
 })
},
// registration this fetched data do compute
computed: {
  prismicData () {
    return this.$store.getters[`prismic/contentMap`][id]
  }
}
// use in template
<template>
  <div v-if="prismicData">
    {{ prismicData }}
  </div>
</template>
```

#Async and synchronous data fetching 
Also you can fetch your data asynchronously, just use asyncData/AsyncDataLoader/serverPrefetch instead of mounted hook
```
asyncData ({ store }) {
  return new Promise((resolve, reject) => {
    store.dispatch('prismic/load', {
      type: 'cms_page'
    }).then(() => {
      resolve()
    })
  })
}
```
#Api side filtering content
Vue-storefront-api prismic extension comes with methods to write custom filter for downloaded content. For example you want to get Prismic data with id xxx, containing
article with two parts: when promotion on whole stock is active and normal. It means that you need to create new filter in Vue-storefront-api with name 'promotion'
and then use it here like this
`store.dispatch('prismic/load', {contentId: 'W5oNzSAAANpzjTfA', filter: 'promotion', filterOption: 'true'}`

#Mapping json data to html
You can use `PrismicDOM` from Prismic `https://github.com/prismicio/prismic-dom`
For more complicated content we suggest writing custom template. Please remember to always check if content is set, using v-if or similar methods. 

```
