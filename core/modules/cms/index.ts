import { cmsPageModule } from './store/page'
import { cmsBlockModule } from './store/block'
import { cmsHierarchyModule } from './store/hierarchy'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

export const KEY = 'cms'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: 'cms_page', module: cmsPageModule },
    { key: 'cms_block', module: cmsBlockModule },
    { key: 'cms_hierarchy', module: cmsHierarchyModule }
  ] },
}

export const Cms = new VueStorefrontModule(moduleConfig)