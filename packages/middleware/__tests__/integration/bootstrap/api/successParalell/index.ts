import { getLogger } from "../../../../../src";

export const successParalell = (context) => {
  const logger = getLogger(context);
  logger.info("successParalell");
  return Promise.resolve({
    status: 200,
    message: "ok",
    error: false,
  });
};
