const log = require('../helpers/log');
const isProduction = require('../helpers/isProduction');
const resolveDependency = require('../helpers/resolveDependency');

module.exports = function VueStorefrontPerformanceModule (options) {
  const useRawSource = (package) => {
    console.log({
      package
    });
    
    const pkgPath = resolveDependency(`${package}/package.json`);
    
    console.log({
      pkgPath
    });

    const pkg = require(pkgPath);

    console.log({
      pkg
    });

    if (pkg.module) {
      this.extendBuild(config => {
        config.resolve.alias[pkg.name + '$'] = resolveDependency(`${package}/${pkg.module}`);
      });
    }

    this.options.build.transpile.push(package);
    log.info(`Using raw source/ESM for ${pkg.name}`);
  };

  options.useRawSource[isProduction(options) ? 'prod' : 'dev'].map(package => useRawSource(package));
};
