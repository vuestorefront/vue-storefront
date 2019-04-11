// Read more about modules: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md
import { afterRegistration } from './hooks/afterRegistration'
import { createModule } from '@vue-storefront/core/lib/module'
import { afterEach } from './router/afterEach'

const store = {
    namespaced: true,
    state: {
        key: null
    }
};

export const KEY = 'intercom';
export const Intercom = createModule({
    key: KEY,
    store: { modules: [{ key: KEY, module: store }] },
    afterRegistration,
    router: { afterEach }
});