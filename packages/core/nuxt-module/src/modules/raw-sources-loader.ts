import log from '../helpers/log';
import isProduction from '../helpers/isProduction';
import resolveDependency from '../helpers/resolveDependency';
import { ModuleOptions } from '../types';

export default function VueStorefrontPerformanceModule(options: ModuleOptions): void {
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
