export const error = () => {
  return Promise.resolve({
    status: 404,
    message: "error",
    error: true,
  });
};
