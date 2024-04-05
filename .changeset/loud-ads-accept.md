---
"@vue-storefront/middleware": minor
---

[ADDED] Options as a second parameter of `createServer`. This allows you to pass additional options to `cors`, `body-parser` and `cookie-parser` express middlewares.

```ts
import { createServer } from '@vue-storefront/middleware';
import config from "../middleware.config";

createServer(config, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  },
  bodyParser: {
    limit: '50mb'
  },
  cookieParser: {
    secret: "secret",
  }
});
```

[CHANGED] `cors` middleware uses the default configuration. If you want to change it, you can pass the options as a second parameter of `createServer`. The default configuration is:

```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```