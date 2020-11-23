
const customerSignOut = async (context): Promise<void> => {
  const { auth } = context.config;
  auth.onTokenRemove();
};

export default customerSignOut;
