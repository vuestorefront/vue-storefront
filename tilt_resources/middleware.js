const { createServer } = require("@vue-storefront/middleware");
const dotenv = require("dotenv");
const config = require("./middleware.config");

dotenv.config();

run();
async function run() {
  const app = await createServer(config);

  app.listen(4000, "", () => {
    console.log("API server is listening on localhost:4000");
  });
}
