import { isUserSession } from '../../helpers/utils';

const isLoggedIn = (context) => {
  const { config } = context;

  if (config.handleIsLoggedIn) {
    return config.handleIsLoggedIn(context);
  }

  return isUserSession(context.config.auth.onTokenRead());
};

export default isLoggedIn;
