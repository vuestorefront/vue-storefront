/* istanbul ignore file */

import { onSSR, vsfRef, configureSSR } from './ssr';
import { sharedRef } from './shared';
import wrap from './wrap';
import { Logger, registerLogger } from './logger';
import mask from './logger/mask';
import { useVSFContext, configureContext, generateContext } from './context';
import { integrationPluginFactory } from './nuxt';
import { markDeprecated } from './helpers';

export {
  wrap,
  onSSR,
  vsfRef,
  configureSSR,
  sharedRef,
  Logger,
  registerLogger,
  mask,
  configureContext,
  useVSFContext,
  generateContext,
  integrationPluginFactory,
  markDeprecated
};
