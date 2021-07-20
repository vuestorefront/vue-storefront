export default async (context) => {
  const { $vsf } = context;
  const currentToken = $vsf.$ct.config.auth.onTokenRead();
  const token = await $vsf.$ct.api.requestAuthToken(currentToken);

  await $vsf.$ct.config.auth.onTokenChange(
    JSON.stringify(token),
    token?.expires_at ? { expires: new Date(token.expires_at) } : {}
  );
};
