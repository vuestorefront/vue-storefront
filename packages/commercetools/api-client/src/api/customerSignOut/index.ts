import { getSettings } from './../../index';

const customerSignOut = async (): Promise<void> => {
  const { auth } = getSettings();
  auth.onTokenRemove();
};

export default customerSignOut;
