
const path = require('path');
const rimraf = require('rimraf');
const esbuild = require('esbuild');

function cwdResolve(name) {
  return path.resolve(process.cwd(), name);
}

const pkg = require(cwdResolve('package.json'));

// Remove old build
rimraf.sync(cwdResolve('lib'));

esbuild.build({
  entryPoints: [
    cwdResolve('src/index.ts')
  ],
  outdir: 'lib',
  format: 'esm',
  outExtension: {
    '.js': '.mjs'
  },
  bundle: true,
  sourcemap: true,
  platform: 'node',
  target: 'node16',
  watch: process.argv.includes('--watch'),
  logLevel: 'warning',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
});
