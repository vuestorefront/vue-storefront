export const throwAxiosError = () => {
  throw { ...new Error('axios error'), isAxiosError: true, response: { status: 404 } };
};
