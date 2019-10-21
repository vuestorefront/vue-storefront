import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
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

  get conn (): AxiosInstance {
    return this.connection
  }

  get config (): Config {
    return this.configuration
  }
}

export default ApiClient
