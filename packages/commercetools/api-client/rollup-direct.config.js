import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/direct/index.ts',
  output: [
    {
      file: pkg.direct,
      format: 'cjs',
      sourcemap: true
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript')
    })
  ]
};
