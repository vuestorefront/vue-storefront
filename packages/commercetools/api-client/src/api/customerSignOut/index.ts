const customerSignOut = async ({ config }) => {
  if (config.auth.onTokenRemove) {
    config.auth.onTokenRemove();
  }
};

export default customerSignOut;
