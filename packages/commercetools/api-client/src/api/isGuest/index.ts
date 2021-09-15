import { isUserSession } from '../../helpers/utils';

const isGuest = (context) => {
  const { config } = context;

  if (config.handleIsGuest) {
    return config.handleIsGuest(context);
  }

  return !isUserSession(config.auth.onTokenRead());
};

export default isGuest;
