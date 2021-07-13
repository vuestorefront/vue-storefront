import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import graphql from '@rollup/plugin-graphql';
import pkg from './package.json';
import { generateBaseConfig } from '../../rollup.base.config';

const extensions = ['.ts', '.graphql', '.js'];

const server = {
  input: 'src/index.server.ts',
  output: [
    {
      file: pkg.server,
      format: 'cjs',
      sourcemap: true
    }
  ],
  external: [
    '@apollo/client/utilities',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    nodeResolve({
      extensions
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      // eslint-disable-next-line global-require
      typescript: require('typescript')
    }),
    graphql()
  ]
};

export default [
  generateBaseConfig(pkg, true),
  server
];
