import { concat } from "eslint-flat-config-utils";

import { ecma, style } from "./src/index.js";

export default concat(ecma(), style());
