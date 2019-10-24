import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { Config } from './types/Config'

class ApiClient {
  private configuration: Config
  private connection: AxiosInstance

  constructor (axiosConfig: AxiosRequestConfig, configuration: Config = {}) {
    this.connection = axios.create(axiosConfig)
    this.configuration = configuration

    if (!this.configuration.locale) {
      this.configuration.locale = ''
    }
  }

  getUri(config?: AxiosRequestConfig): string {
    return this.connection.getUri(config)
  }

  request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R> {
    return this.connection.request(config)
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.connection.get(url, config)
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.connection.delete(url, config)
  }

  head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.connection.head(url, config)
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.connection.post(url, data, config)
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.connection.put(url, data, config)
  }

  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.connection.patch(url, data, config)
  }

  get config (): Config {
    return this.configuration
  }
}

export default ApiClient
