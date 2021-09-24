const customerSignOut = async ({ config }) => {
  config.auth.onTokenRemove?.();
};

export default customerSignOut;
