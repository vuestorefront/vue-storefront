# Layouts and advanced output operations

Starting from version 1.4.0 Vue Storefront allows You to switch the html templates and layouts dynamically in the SSR mode.

This feature can be very usefull for non-standard rendering scenarios like:
- generating the XML output,
- generating the AMPHTML pages,
- generating widgets without `<head>` section
...

## How it works

Before 1.4.0 Vue Storefront generated the output by mix of:
- taking the base HTML template `src/index.template.html`,
- rendering the `src/themes/default/App.vue` root component,
- injecting the Vue SSR output into the template + adding CSS styles, Script references etc. [Read more on Vue SSR Styles and Scripts injection](https://ssr.vuejs.org/guide/build-config.html#client-config)

This mode is still in place and it's enabled by default.
What we've changed is **You can now select which html template + layout Your app is routing in per-route manner**.

## Changelog

The changes we've introduced: 
- now distinct routes can set `context.output.template` in `asyncData` method. By doing so You can skip using `dist/index.html` (which contains typical HTML5 elements - like `<head ...`). This is important when we're going to generate AMPHTML pages (that can not contain any `<script>` tags) - either xml files - You name it
- distinct routes can set `meta.layout` and by doing so switch the previously constant App.vue layout file - this is what @mercs600 proposed some time ago in slightly changed form
- You've got access to server `context` object in `asyncData` and two new features - `output.prepend` and `output.append` have been created to allow You control the rendering flow of the template

## Templates

We've added two new HTML templates + two Vue layouts.
Templates:
- `index.basic.template.html` - which contains the standard HTML markup + CSS injection
- `index.minimal.template.html` - which contains the standard HTML markup without any additional injects - so when You render a Vue component it's output will be pasted into `<body>` and that's all. Probably good starting point for [AMPHTML implementation](https://www.ampstart.com/)

You can add more templates. All You need is to set the proper `config.ssr.templates` variable:

```json
    "ssr": {
      "templates": {
        "default": "dist/index.html",
        "minimal": "dist/index.minimal.html",
        "basic": "dist/index.basic.html"
      },
      "executeMixedinAsyncData": true,
      "initialStateFilter": ["config", "__DEMO_MODE__", "version", "storeView"],
      "useInitialStateFilter": true
    },
```
The templates paths are relative to root folder of `vue-storefront`.
You can also set the template to none (`""`) to skip it. This option can be usefull for XML / JSON / widgets rendering that do not require the whole HTML layout.

## Examples

You can find some examples in the `src/extensions/raw-output-example` example.

### Generating the XML output 
Example URL: `http://localhost:3000/raw-output-example.xml`

Route setup to switch the Vue layout:

```js
  { path: '/raw-output-example.xml', component: RawOutputExample, meta: { layout: 'empty' } }
```

Vue component to render the XML:

```js
<template>
  <raw-content>
    This page is using empty layout set in routes + no html template
  </raw-content>
</template>

<script>
export default {
  name: 'RawOutputExample',
  asyncData ({ store, route, context }) {
    contextserver.response.setHeader('Content-Type', 'text/xml')
    context.output.template = ''
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  data () {
    return {
      'exampleData': 'Data from base component'
    }
  },
  components: {
  }
}
</script>
```

The key part is:

```js
    contextserver.response.setHeader('Content-Type', 'text/xml')
    context.output.template = ''
```
These two statements:
- set the HTTP header (by accessing ExpressJS response object - `contextserver.response`. There is also `contextserver.request` and `context.app` - the ExpressJS application)- set `output.template` to none which will cause to skip the HTML template rendering at all.

### Switching off layout + injecting dynamic content
Example URL: `http://localhost:3000/append-prepend.html`

Route setup to switch the Vue layout:

```js
  { path: '/append-prepend.html', component: NoLayoutAppendPrependExample, meta: { layout: 'empty' } },
```

Vue component to render the XML:
```js
<template>
  <div>This page is rendered with no JavaScripts attached - no layout at all</div>
</template>

<script>
export default {
  name: 'NoJSExample',
  asyncData ({ store, route, context }) {
    context.output.template = ''
    context.output.append = (context) => {
      return '<div>This content has been dynamically appended</div>'
    }
    context.output.prepend = (context) => {
      return '<div>this content has been dynamically prepended</div>'
    }
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  data () {
    return {
      'exampleData': 'Data from base component'
    }
  },
  components: {
  }
}
</script>
```

The key part is:

```js
    context.output.template = ''
    context.output.append = (context) => {
      return '<div>This content has been dynamically appended</div>'
    }
    context.output.prepend = (context) => {
      return '<div>this content has been dynamically prepended</div>'
    }    
```
These two statements:
- set `output.template` to none which will cause to skip the HTML template rendering at all.
- adds the `output.append` and `output.prepend` methods to the server context.

The output will be generated with this logic:
```js
    const contentPrepend = (typeof context.output.prepend === 'function') ? context.output.prepend(context) : ''
    const contentAppend = (typeof context.output.append === 'function') ? context.output.append(context) : ''
    output = contentPrepend + output + contentAppend
```

Please note, that the `context` contains lot of interesting features You can use to control the CSS, SCRIPT and META injection. [Read more on Vue SSR Styles and Scripts injection](https://ssr.vuejs.org/guide/build-config.html#client-config)

**Note: [The context object = Vue.prototype.$ssrContext](https://ssr.vuejs.org/guide/head.html)**

## Upgrade notes
