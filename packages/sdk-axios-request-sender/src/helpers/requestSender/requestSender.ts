import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { AllowedMethods, CustomErrorHandler } from "../../types";

/**
 * Class providing a simplified API for sending HTTP requests
 * in Vue Storefront SDK methods.
 *
 * @remarks
 * For the nonce, the class only allows sending POST or GET
 * requests. Its main purpose is to abstract away the
 * logic behind passing SDK method props to the request
 * (i.e. as a request body or query parameters).
 *
 * It also silently falls back to `POST` in case the `GET`
 * request throws the `414 URI Too Long` error. The behaviour
 * can be customized by using a custom error handler.
 *
 * @example
 * Using the class in a Vue Storefront SDK method:
 *
 * ```ts
 * import { client } from '../client';
 * import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
 *
 * export async function getCategory<Res>(props, options): Promise<Res> {
 *   return new AxiosRequestSender(client)
 *     .setUrl("getCategory")
 *     .setMethod("GET")
 *     .setProps(props)
 *     .setConfig(options?.axiosRequestConfig)
 *     .setErrorHandler((error) => throw error)
 *     .send<Res>();
 * }
 * ```
 */
export class AxiosRequestSender {
  private config: AxiosRequestConfig;

  private props: unknown;

  private url: string;

  private method: AllowedMethods = "POST";

  constructor(private readonly client: AxiosInstance) {}

  /**
   * Method injecting user-defined
   * configuration (coming from outside the SDK method)
   * into the request.
   */
  setConfig(config: AxiosRequestConfig) {
    this.config = config;
    return this;
  }

  /**
   * Method setting request URL. It can be either a full
   * URL or - in case the client already has the `baseURL`
   * set - just a path.
   */
  setUrl(url: string) {
    this.url = url;
    return this;
  }

  /**
   * Method passing props to the request. Depending on
   * the HTTP method, they will be sent as either a
   * request body or the "body" query parameter (expected
   * by Vue Storefront's Server Middleware).
   */
  setProps(props: unknown) {
    this.props = props;
    return this;
  }

  /**
   * Method setting the HTTP method to use for the request.
   * If not used, the default method is `POST`.
   */
  setMethod(method: AllowedMethods) {
    this.method = method.toUpperCase() as AllowedMethods;
    return this;
  }

  /**
   * Method customizing the error handler. The default one
   * - in case the request method is `GET` and the error has
   * the 414 code (URI Too Long) - re-sends the request as
   * `POST`. In other cases, it simply re-throws the original error.
   */
  setErrorHandler(handler: CustomErrorHandler) {
    this.handleError = handler;
    return this;
  }

  /**
   * Method sending the HTTP request.
   */
  async send<Res>(): Promise<Res> {
    const method = this.config?.method ?? this.method;

    try {
      const { data } = await this[method]<Res>();
      return data;
    } catch (error) {
      return this.handleError<Res>(error);
    }
  }

  /**
   * HTTP GET request handler.
   */
  private async GET<Res>(): Promise<AxiosResponse<Res>> {
    const params = { body: JSON.stringify(this.props) };

    return this.client.get<Res>(this.url, { params, ...this.config });
  }

  /**
   * HTTP POST request handler.
   */
  private async POST<Res>(): Promise<AxiosResponse<Res>> {
    return this.client.post<Res>(this.url, this.props, this.config);
  }

  /**
   * The default error handler.
   */
  private async handleError<Res>(error: any): Promise<Res> {
    const isGET = error?.config?.method?.toUpperCase() === "GET";
    const isUriTooLong = error?.response?.status === 414;

    if (isGET && isUriTooLong) {
      this.setMethod("POST");
      return this.send();
    }

    throw error;
  }
}
