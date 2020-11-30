/* istanbul ignore file */

import { onSSR, vsfRef, configureSSR } from './ssr';
import { sharedRef } from './shared';
import wrap from './wrap';
import { Logger, registerLogger } from './logger';
import mask from './logger/mask';
import { useContext, configureContext, generateContext, composeApiWithContext } from './context';
import { createIntegrationPlugin } from './nuxt';

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
  useContext,
  generateContext,
  createIntegrationPlugin,
  composeApiWithContext
};
