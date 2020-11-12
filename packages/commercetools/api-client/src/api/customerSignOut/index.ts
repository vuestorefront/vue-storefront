
const customerSignOut = async ({ $vsfSettings }): Promise<void> => {
  $vsfSettings.auth.onTokenRemove();
};

export default customerSignOut;
