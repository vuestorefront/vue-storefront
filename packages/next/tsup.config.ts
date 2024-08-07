import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    client: "src/client.ts",
  },
  target: "es2015",
  format: ["cjs", "esm"],
  dts: true,
});
