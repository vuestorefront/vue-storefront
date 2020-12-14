import { isAnonymousSession, isUserSession } from '../../helpers/commercetoolsLink';

const isGuest = (context) => {
  const { client, config } = context;

  if (config.handleIsGuest) {
    return config.handleIsGuest(context);
  }

  if (client.tokenProvider) {
    const token = config.auth.onTokenRead();
    return !isAnonymousSession(token) && !isUserSession(token);
  }

  return false;
};

export default isGuest;
