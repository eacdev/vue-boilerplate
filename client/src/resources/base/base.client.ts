import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class BaseClient {
  private api: AxiosInstance;

  /**
   * Create a new axios instance with the config passed as parameter.
   * @param config a client's custom axios onfig
   */
  constructor(config: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param
    }));
  }

  public get<T = object, R = AxiosResponse<T>>(url = ''): Promise<R> {
    return this.api.get(url);
  }

  public post<T = object, R = AxiosResponse<T>>(
    url = '',
    data?: object
  ): Promise<R> {
    if (data) {
      return this.api.post(url, data);
    }
    return this.api.post(url);
  }
}
