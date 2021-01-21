import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.client.ts',
  output: [
    {
      file: pkg.client,
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
