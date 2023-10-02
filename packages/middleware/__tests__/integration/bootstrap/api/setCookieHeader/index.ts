export const setCookieHeader = (context) => {
  context.res.setHeader("set-cookie", "somecookie=12");
  return Promise.resolve({
    status: 200,
    message: "ok",
    error: false,
  });
};
