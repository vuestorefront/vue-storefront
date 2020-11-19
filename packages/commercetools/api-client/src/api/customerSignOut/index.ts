import { Config } from './../../types/setup';

const customerSignOut = async (settings: Config): Promise<void> => {
  const { auth } = settings;
  auth.onTokenRemove();
};

export default customerSignOut;
