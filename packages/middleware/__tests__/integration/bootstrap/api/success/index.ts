export const success = () => {
  return Promise.resolve({
    status: 200,
    message: "ok",
    error: false,
  });
};
