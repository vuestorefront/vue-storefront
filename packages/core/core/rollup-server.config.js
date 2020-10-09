import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

export function generateBaseConfig(pkg) {
  return {
    input: 'src/server/index.ts',
    output: [
      {
        file: pkg.mainServer,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.moduleServer,
        format: 'es',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
      typescript({
        // eslint-disable-next-line global-require
        typescript: require('typescript')
      }),
      replace({
        __DEV__: process.env.NODE_ENV === 'development',
        delimiters: ['', '']
      })
    ]
  };
}

const baseConfig = generateBaseConfig(pkg);

export default baseConfig;
