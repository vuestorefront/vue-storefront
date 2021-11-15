import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.ts', '.js'];

export function generateBaseConfig(pkg, useTerser = false) {
  const plugins = [
    nodeResolve({
      extensions
    }),
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript'),
      objectHashIgnoreUnknownHack: false
    })
  ];

  if (useTerser) plugins.push(terser());

  return {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins
  };
}
