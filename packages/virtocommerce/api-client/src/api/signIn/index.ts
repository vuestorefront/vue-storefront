import { vcAuthClient, getSettings, getMe } from '../../index';

const signIn = async (username: string, password: string) => {

  const { setAccessToken, setUserId } = getSettings();

  const response = await vcAuthClient.owner.getToken(username, password);

  if (response.accessToken) {
    setAccessToken(response.accessToken);
    const me = await getMe();
    setUserId(me.id);
  }
  return response;
  
};

export default signIn;