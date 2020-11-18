const log = require('../helpers/log');
const resolveDependency = require('../helpers/resolveDependency');

module.exports = function VueStorefrontPerformanceModule (options) {
  const isProd = process.env.NODE_ENV === 'production' || options.coreDevelopment;

  const useRawSource = (package) => {
    const pkgPath = resolveDependency(`${package}/package.json`);
    const pkg = require(pkgPath);

    if (pkg.module) {
      this.extendBuild(config => {
        config.resolve.alias[pkg.name + '$'] = resolveDependency(`${package}/${pkg.module}`);
      });
    }

    this.options.build.transpile.push(package);
    log.info(`Using raw source/ESM for ${pkg.name}`);
  };

  options.useRawSource[isProd ? 'prod' : 'dev'].map(package => useRawSource(package));
};
