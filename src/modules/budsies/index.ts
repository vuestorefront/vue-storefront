import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import addonFactory from './factories/addon.factory';
import Addon from './models/addon.model';
import { ProductValue } from './models/product.value';
import ErrorConverterService from './services/error-converter.service';
import { budsiesStore } from './store'
import { Dictionary } from './types/Dictionary.type';
import ObjectBuilderInterface from './types/object-builder.interface';
import { ValueCollection } from './types/value.collection';
import { Value } from './types/value.interface';
import { cacheHandlerFactory } from './helpers/cacheHandler';
import Vue from 'vue'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { isServer } from '@vue-storefront/core/helpers'
import * as types from './store/mutation-types'

export const BudsiesModule: StorefrontModule = async function ({ store }) {
  StorageManager.init(types.SN_BUDSIES);

  store.registerModule('budsies', budsiesStore);

  if (!isServer) {
    store.dispatch('budsies/synchronize');
  }

  store.subscribe(cacheHandlerFactory(Vue));
}

export {
  Addon,
  addonFactory,
  Dictionary,
  ObjectBuilderInterface,
  ErrorConverterService,
  ProductValue,
  ValueCollection,
  Value
}
