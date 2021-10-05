import { isAnonymousSession, isUserSession } from '../../helpers/utils';

const isGuest = (context) => {
  const { config } = context;

  if (typeof config.handleIsGuest === 'function') {
    return config.handleIsGuest(context);
  }

  const token = context.config.auth.onTokenRead();
  return !isAnonymousSession(token) && !isUserSession(token);
};

export default isGuest;
