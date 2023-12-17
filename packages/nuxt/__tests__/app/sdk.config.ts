// eslint-disable-next-line import/no-relative-packages
import { exampleSdkModule } from "../sdk";

export default defineSdkConfig(
  ({ buildModule, middlewareUrl, getCookieHeader }) => ({
    example: buildModule(exampleSdkModule, {
      apiUrl: `${middlewareUrl}/test_integration`,
      headers: { cookie: getCookieHeader() },
    }),
  })
);
