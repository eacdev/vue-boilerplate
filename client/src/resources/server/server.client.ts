import { AxiosRequestConfig, AxiosResponse } from 'axios';
import BaseClient from '../base/base.client';
import Server from './server.model';

export default class ServerClient extends BaseClient {
  /**
   * Create a new axios instance with these custom options.
   */
  constructor() {
    const options: AxiosRequestConfig = {
      baseURL: `http://localhost:8080/servers`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    super(options);
  }

  /**
   * GET request on /servers.
   */
  public async index(): Promise<AxiosResponse<Server[]>> {
    return this.get();
  }
}
