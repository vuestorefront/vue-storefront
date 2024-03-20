import { ExtendedGlobalThis } from "./types";

export default () => {
  (globalThis as ExtendedGlobalThis).__MIDDLEWARE__.close();
};
