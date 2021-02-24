import defaultMutation from './defaultMutation';
import { CartData } from './../../types/Api';
import gql from 'graphql-tag';

const createCart = async (context, cartDraft: CartData = {}) => {
  const { locale, acceptLanguage, currency } = context.config;

  const defaultVariables = {
    acceptLanguage,
    locale,
    draft: {
      currency,
      ...cartDraft
    }
  };

  const { createCart } = context.createQuery({
    createCart: { query: defaultMutation, variables: defaultVariables }
  });

  const request = await context.client.mutate({
    mutation: gql`${createCart.query}`,
    variables: createCart.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default createCart;
