# Layouts and advanced output operations

Starting from version 1.4.0, Vue Storefront allows you to switch the HTML templates and layouts dynamically in the SSR mode.

This feature can be very useful for non-standard rendering scenarios like:

- Generating the XML output
- Generating the AMPHTML pages
- Generating widgets without `<head>` section

## How it works

Before 1.4.0, Vue Storefront generated the output by a mix of:

- Taking the base HTML template `src/index.template.html`,
- Rendering the `src/themes/default/App.vue` root component,
- Injecting the Vue SSR output into the template + adding CSS styles, script references etc. [Read more on Vue SSR Styles and Scripts injection](https://ssr.vuejs.org/guide/build-config.html#client-config)

This mode is still in place and is enabled by default. What we've changed is that **you can now select which HTML template and layout your app is routing in per-route manner.**

## Changelog

The changes we’ve introduced include:

- Distinct routes can now set `context.output.template` in `asyncData` method. By doing so, you can skip using `dist/index.html` (which contains typical HTML5 elements - like `<head>`). This is important when we're going to generate either AMPHTML pages (that cannot contain any `<script>` tags) or XML files - you name it.
- Distinct routes can set `meta.layout` and by doing so, switch the previously constant `App.vue` layout file.
- Access to server `context` object in `asyncData` and two new features - `output.prepend` and `output.append` have been created to allow you to control the rendering flow of the template.

## Templates

We added two new HTML templates + two Vue layouts.

Templates:

- `index.basic.template.html` - basic elements
- `index.minimal.template.html` - it contains the standard HTML markup without any additional injects, so when you render a Vue component, its output will be pasted into `<body>` and that's all. Probably good starting point for [AMPHTML implementation](https://www.ampstart.com/)

You can add more templates. All you need is to set the proper `config.ssr.templates` variable in `config/local.json`:

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

Templates paths are relative to the root folder of `vue-storefront`. You can also set the template to none ("") to skip it. This option can be useful for XML / JSON / widgets rendering that does not require the whole HTML layout.

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
    This page is using empty layout set in routes + no HTML template
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
contextserver.response.setHeader('Content-Type', 'text/xml');
context.output.template = '';
```

These two statements:

- Set the HTTP header (by accessing ExpressJS response object—  `contextserver.response`. There is also `contextserver.request` and `context.app` - the ExpressJS application)- set `output.template` to none, which will skip the HTML template rendering at all.

### Switching off layout and injecting dynamic content

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
context.output.template = '';
context.output.append = context => {
  return '<div>This content has been dynamically appended</div>';
};
context.output.prepend = context => {
  return '<div>this content has been dynamically prepended</div>';
};
```

These two statements:

- Set `output.template` to none, which will cause to skip the HTML template rendering at all.
- Add the `output.append` and `output.prepend` methods to the server context.

The output will be generated with this logic:

```js
const contentPrepend =
  typeof context.output.prepend === 'function'
    ? context.output.prepend(context)
    : '';
const contentAppend =
  typeof context.output.append === 'function'
    ? context.output.append(context)
    : '';
output = contentPrepend + output + contentAppend;
```

Please note that the `context` contains a lot of interesting features you can use to control the CSS, SCRIPT and META injection. [Read more on Vue SSR Styles and Scripts injection](https://ssr.vuejs.org/guide/build-config.html#client-config)

**Note: [The context object = Vue.prototype.$ssrContext](https://ssr.vuejs.org/guide/head.html)**


## Output compression

HTML Minifier has been added to Vue Storefront 1.11. To enable this feature please switch the `config.server.useHtmlMinifier`. You can set the specific configuration of the `htmlMinifier` using the `config.server.htmlMinifierOptions`. Read more on the [available configuration](https://www.npmjs.com/package/html-minifier). The minified output is then being cached by `SSR Output cache` mechanism.

Output compression has been also enabled (if the `src/modules/server.ts` contains the `compression` module on the list). By default it works just for production builds. It uses the `gzip` compression by default. [Read more about the `compression` module](https://www.npmjs.com/package/compression) that we're using for this implementation.
