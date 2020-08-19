import typescript from 'rollup-plugin-typescript2';

export function generateBaseConfig(pkg) {
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
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
      typescript({
        // eslint-disable-next-line global-require
        typescript: require('typescript')
      })
    ]
  };
}
