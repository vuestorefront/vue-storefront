/* eslint-disable import/no-relative-packages */
import { CreateSdkOptions, createSdk } from "../../../src/index";
import { exampleSdkModule } from "../../sdk";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:4000/",
  },
};

export const { getSdk, createSdkContext } = createSdk(
  options,
  ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
    example: buildModule(exampleSdkModule, {
      apiUrl: `${middlewareUrl}test_integration`,
      headers: getRequestHeaders(),
    }),
  })
);
