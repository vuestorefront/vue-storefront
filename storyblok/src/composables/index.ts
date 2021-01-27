import { integrationPluginFactory } from '@vue-storefront/core'
import createApiClient from '../config'
import { useContent } from './useContent'
import { extractComponents } from './renderContent'

const integrationPlugin = integrationPluginFactory(createApiClient)

export { useContent, extractComponents, integrationPlugin }
