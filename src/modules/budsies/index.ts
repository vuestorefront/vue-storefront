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

export const BudsiesModule: StorefrontModule = async function ({ store }) {
  store.registerModule('budsies', budsiesStore);
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
