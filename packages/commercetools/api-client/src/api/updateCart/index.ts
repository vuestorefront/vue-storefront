import { Logger } from '@vue-storefront/core';
import getMe from '../getMe';
import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
import { CustomQueryFn } from './../../types/Api';
import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { getCustomQuery } from './../../helpers/queries';

const VERSION_MISSMATCH_STRING = 'different version than expected';

interface UpdateCart {
  id: string;
  version: number;
  actions: CartUpdateAction[] | MyCartUpdateAction[];
  versionFallback?: boolean;
}

const updateCart = async (context, params: UpdateCart, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage } = context.config;
  const defaultVariables = params
    ? {
      locale,
      acceptLanguage,
      ...params
    }
    : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  try {
    const request = await context.client.mutate({
      mutation: gql`${query}`,
      variables,
      fetchPolicy: 'no-cache'
    });

    return request;
  } catch (error) {
    const retry = params.versionFallback ?? true;
    if (!(error.toString().includes(VERSION_MISSMATCH_STRING) && retry)) {
      throw error;
    }

    Logger.debug('Cart version missmatch. Fetching new version and retrying.');

    const { data } = await getMe(context, { customer: false });
    return updateCart(context, {
      ...params,
      version: data.me.activeCart.version
    });
  }
};

export default updateCart;
