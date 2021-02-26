import defaultMutation from './defaultMutation';
import { CartData } from './../../types/Api';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';

const createCart = async (context, cartDraft: CartData = {}, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency } = context.config;

  const defaultVariables = {
    acceptLanguage,
    locale,
    draft: {
      currency,
      ...cartDraft
    }
  };

  const { createCart } = context.extendQuery(
    customQuery, { createCart: { query: defaultMutation, variables: defaultVariables } }
  );

  const request = await context.client.mutate({
    mutation: gql`${createCart.query}`,
    variables: createCart.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default createCart;
