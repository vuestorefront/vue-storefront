import { getLogger } from "../../../../../src";

export const success = (context) => {
  const logger = getLogger(context);
  logger.info("success");
  return Promise.resolve({
    status: 200,
    message: "ok",
    error: false,
  });
};
