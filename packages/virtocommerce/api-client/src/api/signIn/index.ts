import  getMe from '../getMe';

const signIn = async ({ config, client, authClient }, username: string, password: string) => {

  const { setAccessToken, setUserId } = config;

  const response = await authClient.owner.getToken(username, password);

  if (response.accessToken) {
    setAccessToken(response.accessToken);
    const me = await getMe({ config, client });
    setUserId(me.id);
  }
  return response;
  
};

export default signIn;