import {refs} from './index'

export function extendStore (moduleName: string | string[], module: any) {
  const merge = function (object: any = {}, source: any) {
    for (let key in source) {
      if (typeof source[key] === 'object') {
        object[key] = merge(object[key], source[key])
      } else {
        object[key] = source[key]
      }
    }
    return object
  };
  moduleName = Array.isArray(moduleName) ? moduleName : [moduleName]
  const originalModule: any = moduleName.reduce(
    (state: any, moduleName: string) => state._children[moduleName],
    refs.store._modules.root
  )
  const rawModule: any = merge({}, originalModule._rawModule)
  const extendedModule: any = merge(rawModule, module)

  refs.store.unregisterModule(moduleName)
  refs.store.registerModule(moduleName, extendedModule)
}
