import get from 'lodash-es/get'

import config from 'config'
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader';
import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'

import { isUrlInLowerCase } from './helpers/is-url-in-lower-case.function'

const REDIRECT_CODE = 301;

export const forStoryblok = async ({ dispatch, rootState }, { url, params }) => {
  if (params && params._storyblok_c && params._storyblok_c === 'page') {
    return {
      name: 'storyblok-page'
    }
  }
  if (params && params._storyblok_c && params._storyblok_c === 'block') {
    return {
      name: 'storyblok-block',
      meta: { layout: 'empty' }
    }
  }

  let formattedUrl = url;

  if (formattedUrl.startsWith('/')) {
    formattedUrl = formattedUrl.replace('/', '');
  }

  formattedUrl = formattedUrl.replace(/\/?(\?.*)?$/, '') // remove trailing slash and/or qs variables if present
  const storeCode = storeCodeFromRoute(formattedUrl)
  const addStoreCode = get(config, 'storyblok.settings.appendStoreCodeFromHeader')
  const storeCodeToAdd = rootState.storyblok.storeCode
  if (addStoreCode && storeCodeToAdd) {
    formattedUrl = `${storeCodeToAdd}/${(formattedUrl || 'home')}`
  }
  if (config.storeViews.multistore && storeCode && formattedUrl.replace(/\/$/, '') === removeStoreCodeFromRoute(formattedUrl)) {
    formattedUrl = `${formattedUrl}/home`
  }

  if (!isUrlInLowerCase(url)) {
    const isStoryExist = await dispatch(`storyblok/checkStoryExist`, { fullSlug: formattedUrl.toLowerCase() }, { root: true });

    if (!isStoryExist) {
      return;
    }

    AsyncDataLoader.push({
      execute: async ({ context }) => {
        if (context) {
          context.server.response.redirect(
            REDIRECT_CODE,
            url.toLowerCase()
          );
        }
      }
    });
    return;
  }

  const story = await dispatch(`storyblok/loadStory`, { fullSlug: formattedUrl }, { root: true })
  if (story && story.full_slug) {
    return {
      name: 'storyblok-page',
      path: formattedUrl ? `/${formattedUrl}/` : undefined,
      params: {
        slug: story.full_slug
      }
    }
  }
}
