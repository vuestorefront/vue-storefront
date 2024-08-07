import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

const extensions = [".ts", ".js"];

export function generateBaseConfig(pkg: any) {
  return {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
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
    ],
  };
}
