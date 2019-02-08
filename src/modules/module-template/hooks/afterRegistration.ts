import { Logger } from '@vue-storefront/core/lib/logger'

// This function will be fired both on server and client side context after registering other parts of the module
export function afterRegistration({ Vue, config, store, isServer }){
  if (isServer) Logger.info('This will be called after extension registration and only on client side')()
}
