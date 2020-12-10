# HTTP2 Server Push
This module adds `Link` headers to main document's response to provide critical assets (ones which are preloaded by default) to client's browser. This feature should make your website faster.   

Caution: It works only in production mode!

## How to enable
Just set `config.server.http2ServerPush` in your config to the `true`.

## What kind of values `context.getPreloadFiles` returns?
It returns an array of object like:
```js
[
    {
        file: 'manifest.0ad7eda4c71436457db8.js',
        extension: 'js',
        fileWithoutQuery: 'manifest.0ad7eda4c71436457db8.js',
        asType: 'script'
    },
    {
        file: 'vsf-layout-default.0ad7eda4c71436457db8.js',
        extension: 'js',
        fileWithoutQuery: 'vsf-layout-default.0ad7eda4c71436457db8.js',
        asType: 'script'
    },
    {
        file: 'vsf-layout-default.0ad7eda4c71436457db8.js.map',
        extension: 'map',
        fileWithoutQuery: 'vsf-layout-default.0ad7eda4c71436457db8.js.map',
        asType: ''
    }
]
```