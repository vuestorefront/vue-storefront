import { Context } from '@vue-storefront/core';
import { createAuthHandlers } from './../../helpers/commercetoolsLink/linkHandlers';

const accessToken = async (context: Context, currentToken) => {
  const { obtainBasicToken } = createAuthHandlers({
    settings: context.config,
    currentToken
  });

  return obtainBasicToken();
};

export default accessToken;
