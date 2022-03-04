import log from '../helpers/log';
import isProduction from '../helpers/isProduction';
import resolveDependency from '../helpers/resolveDependency';

export default function VueStorefrontPerformanceModule (options) {
  const useRawSource = (pckg) => {
    const pkgPath = resolveDependency(`${pckg}/package.json`);
    // eslint-disable-next-line global-require
    const pkg = require(pkgPath || '');

    if (pkg.module) {
      this.extendBuild(config => {
        config.resolve.alias[pkg.name + '$'] = resolveDependency(`${pckg}/${pkg.module}`);
      });
    }

    this.options.build.transpile.push(pckg);
    log.info(`Using raw source/ESM for ${pkg.name}`);
  };

  options.useRawSource[isProduction(options) ? 'prod' : 'dev'].map(pckg => useRawSource(pckg));
}
