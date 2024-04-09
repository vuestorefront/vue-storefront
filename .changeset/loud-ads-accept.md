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

[ADDED] `http://localhost:4000` to the default cors origin.