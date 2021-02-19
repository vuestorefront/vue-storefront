import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import graphql from 'rollup-plugin-graphql';

export default {
  input: 'src/index.server.ts',
  output: [
    {
      file: pkg.server,
      format: 'cjs',
      sourcemap: true
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      // eslint-disable-next-line global-require
      typescript: require('typescript')
    }),
    graphql()
  ]
};
