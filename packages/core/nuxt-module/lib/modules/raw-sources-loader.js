const log = require('../helpers/log');
const isProduction = require('../helpers/isProduction');
const resolveDependency = require('../helpers/resolveDependency');

module.exports = function VueStorefrontPerformanceModule (options) {
  const useRawSource = (package) => {
    const pkgPath = resolveDependency(`${package}/package.json`);
    const { module } = require(pkgPath);

    const modulePath = module
      ? `${package}/${module}`
      : package;
    
    const path = resolveDependency(modulePath);

    if (path) {
      this.extendBuild(config => {
        config.resolve.alias[package + '$'] = path;
      });
    }

    this.options.build.transpile.push(package);
    log.info(`Using raw source/ESM for ${package}`);
  };

  options.useRawSource[isProduction(options) ? 'prod' : 'dev'].map(package => useRawSource(package));
};
