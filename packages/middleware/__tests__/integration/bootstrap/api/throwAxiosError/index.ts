export const throwAxiosError = () => {
  // eslint-disable-next-line no-throw-literal
  throw {
    ...new Error("axios error"),
    isAxiosError: true,
    response: { status: 404 },
  };
};
