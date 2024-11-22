export const upload = (context) => {
  const { files } = context.req;

  return Promise.resolve({
    status: 200,
    message: "ok",
    error: false,
    files,
  });
};
