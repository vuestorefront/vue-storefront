
const customerSignOut = async (context): Promise<void> => {
  await context.$ct.api.cleanSession();
};

export default customerSignOut;
