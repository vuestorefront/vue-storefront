const customerSignOut = async ({ config, client }) => {
  if (config.auth.onTokenRemove) {
    config.auth.onTokenRemove();
  }

  if (client.tokenProvider) {
    client.tokenProvider.invalidateTokenInfo();
  }
};

export default customerSignOut;
