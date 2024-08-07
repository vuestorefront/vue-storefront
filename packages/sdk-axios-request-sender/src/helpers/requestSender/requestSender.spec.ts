import type { AxiosInstance } from "axios";
import { AxiosRequestSender } from "./requestSender";

/** SETUP */
const RESPONSE_MOCK = {};
const CLIENT_MOCK = {
  get: jest.fn(() => Promise.resolve(RESPONSE_MOCK)),
  post: jest.fn(() => Promise.resolve(RESPONSE_MOCK)),
} as unknown as AxiosInstance;
const URL_MOCK = "/test";
const CONFIG_MOCK = {};
const PROPS_MOCK = {};
const ERROR_HANDLER_MOCK = jest.fn();

/** TESTS */
describe("[requestSender]", () => {
  let requestSender: AxiosRequestSender;
  beforeEach(() => {
    requestSender = new AxiosRequestSender(CLIENT_MOCK);
    jest.clearAllMocks();
  });

  it("calls client.get once", async () => {
    await requestSender.setMethod("GET").send();

    expect(CLIENT_MOCK.get).toHaveBeenCalledTimes(1);
  });

  it("calls client.post once", async () => {
    await requestSender.setMethod("POST").send();

    expect(CLIENT_MOCK.post).toHaveBeenCalledTimes(1);
  });

  it("uses the specified url", async () => {
    await requestSender.setUrl(URL_MOCK).send();

    expect(CLIENT_MOCK.post).toHaveBeenCalledWith(
      URL_MOCK,
      undefined,
      undefined
    );
  });

  it("uses the specified config", async () => {
    await requestSender.setConfig(CONFIG_MOCK).send();

    expect(CLIENT_MOCK.post).toHaveBeenCalledWith(
      undefined,
      undefined,
      CONFIG_MOCK
    );
  });

  it("uses the specified error handler", async () => {
    (CLIENT_MOCK.post as jest.Mock).mockRejectedValueOnce(new Error());

    await requestSender.setErrorHandler(ERROR_HANDLER_MOCK).send();

    expect(ERROR_HANDLER_MOCK).toHaveBeenCalledTimes(1);
  });

  it("includes props in client.get query params", async () => {
    await requestSender.setMethod("GET").setProps(PROPS_MOCK).send();

    expect(CLIENT_MOCK.get).toHaveBeenCalledWith(undefined, {
      params: { body: JSON.stringify(PROPS_MOCK) },
    });
  });

  it("includes props in client.post body", async () => {
    await requestSender.setProps(PROPS_MOCK).send();

    expect(CLIENT_MOCK.post).toHaveBeenCalledWith(
      undefined,
      PROPS_MOCK,
      undefined
    );
  });

  it('throws "POST" errors', async () => {
    const error = new Error();
    (CLIENT_MOCK.post as jest.Mock).mockRejectedValueOnce(error);

    await expect(requestSender.setMethod("POST").send()).rejects.toThrow();
  });

  it('retries 414 "GET" errors as "POST"', async () => {
    (CLIENT_MOCK.get as jest.Mock).mockRejectedValueOnce({
      config: { method: "GET" },
      response: { status: 414 },
    });

    await requestSender.setMethod("GET").send();

    expect(CLIENT_MOCK.post).toHaveBeenCalledTimes(1);
  });

  it("throws errors other than 414", async () => {
    const error = new Error();
    (CLIENT_MOCK.get as jest.Mock).mockRejectedValueOnce(error);

    await expect(requestSender.setMethod("GET").send()).rejects.toThrow();
  });
});
