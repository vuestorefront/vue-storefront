import { auth } from './../../index';

const customerSignOut = async (): Promise<void> => {
  auth.onTokenRemove();
};

export default customerSignOut;
