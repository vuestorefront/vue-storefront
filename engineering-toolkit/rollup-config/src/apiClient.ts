import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { OutputBundle, OutputOptions } from "rollup";

const extensions = [".ts", ".js"];
// TODO add debug mode with advanced sourcemaps

export function generateServerConfig(pkg: any) {
  return {
    input: "src/index.server.ts",
    output: [
      {
        file: pkg.server,
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      nodeResolve({
        extensions,
      }),
      typescript({ clean: true }),
      commonjs({
        extensions,
      }),
      json(),
      nodeResolve({
        extensions,
      }),
      /**
       * output: { file: pkg.server } in this file above always boils down to { file: 'server/index.js' }
       *
       * The output will be:
       * - server/index.js (JS output of compiling index.server.ts, as per "output" property in this file)
       * - server/index.d.ts (WRONG! This contains typedefs for the index.ts file, not the index.server.ts file)
       * - server/index.server.d.ts (This contains typedefs for index.server.ts, but should be named index.d.ts to match the server/index.js file)
       *
       * The issue with the above outputs is that importing `@vsf-enterprise/someintegration-api/server` will throw errors,
       * because you're using server/index.js with typedefs (server/index.d.ts) of a totally different file
       */
      {
        name: "RemoveIndexTypedefMismatch",
        generateBundle: (options: OutputOptions, bundle: OutputBundle) => {
          // these files are for the src/index.ts file, not for src/index.server.ts, so we can remove them.
          delete bundle["index.d.ts"];
          delete bundle["index.d.ts.map"];
          // The object keys being file names is just a decoration, the actual name of the output file is in the .fileName property
          bundle["index.server.d.ts"].fileName = "index.d.ts";
          bundle["index.server.d.ts.map"].fileName = "index.d.ts.map";
        },
      },
    ],
  };
}
