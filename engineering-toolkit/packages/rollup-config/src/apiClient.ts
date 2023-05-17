import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

const extensions = ['.ts', '.js'];
// TODO add debug mode with advanced sourcemaps

export function generateServerConfig(pkg: any) {
  return {
    input: 'src/index.server.ts',
    output: [
      {
        file: pkg.server,
        format: 'cjs',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({
        extensions
      }),
      typescript(),
      commonjs({
        extensions
      }),
      nodeResolve({
        extensions
      })
    ]
  };
}
