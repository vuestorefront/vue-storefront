const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const esbuild = require('esbuild');

function cwdResolve(name) {
  return path.resolve(process.cwd(), name);
}

const pkg = require(cwdResolve('package.json'));

const entryPoints = [
  cwdResolve('src/index.ts')
];

if (fs.existsSync(cwdResolve('src/index.server.ts'))) {
  entryPoints.push(cwdResolve('src/index.server.ts'));
}

// Remove old build
rimraf.sync(cwdResolve('lib'));

esbuild.build({
  entryPoints,
  outdir: 'lib',
  format: 'esm',
  outExtension: {
    '.js': '.mjs'
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  target: 'node14',
  watch: process.argv.includes('--watch'),
  logLevel: 'warning',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
});
