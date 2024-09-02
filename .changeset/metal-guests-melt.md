---
"@vue-storefront/middleware": major
---

- [CHANGED] [BREAKING] Changed return type of `createServer()` from `Express` to `Server` (from built-in `node:http` package). Both of those types' interfaces have the `.listen()` method with the same shape. In some older templates for starting the middleware (`middleware.js` in your repo) you come across:

```ts
async function runMiddleware(app: Express) {
```

If you're using that older template, please change the `Express` type to `Server`:
```diff
+ import { Server } from "node:http"
+ async function runMiddleware(app: Server) {
- async function runMiddleware(app: Express) {
```

- [ADDED] New GET /readyz endpoint for middleware for using with Kubernetes readiness probes. Please see https://docs.alokai.com/middleware/guides/readiness-probes for more information
