import { AxiosRequestConfig, AxiosResponse } from 'axios';
import BaseClient from '../base/base.client';
import Message from './message.model';

export default class MessageClient extends BaseClient {
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
   * GET request on /servers/xyz/messages.
   */
  public async index(serverId: number): Promise<AxiosResponse<Message[]>> {
    return this.get(`${serverId}/messages`);
  }
}
