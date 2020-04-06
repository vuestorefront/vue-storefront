# VSF Cache Fastly
This module extends default caching docs/guide/basics/ssr-cache.md to allow using fastly as cache provider.

## How to install
Add to config:
```json
"fastly": {
  "enabled": true,
  "serviceId": "xyz", // (https://docs.fastly.com/en/guides/finding-and-managing-your-account-info#finding-your-service-id)
  "token": "xyz" // fastly api token (https://docs.fastly.com/api/auth#tokens)
}
```

Change those values in `server` section:
```json
"useOutputCacheTagging": true,
"useOutputCache": true
```

## How to purge cache?
Open:
```
http://localhost:3000/invalidate?key=aeSu7aip&tag=home
```
