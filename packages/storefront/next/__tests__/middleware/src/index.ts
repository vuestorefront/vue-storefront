import { createServer } from "@vue-storefront/middleware";
import config from "../middleware.config";

const port = 4000;

(async () => {
  const server = await createServer(config);
  server.listen(port, "", () => {
    console.log(`[test-middleware] API server listening on port ${port}`);
  });
})();
