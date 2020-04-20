import { AxiosRequestConfig, AxiosResponse } from "axios";
import BaseClient from "../base/base.client";

export default class UserClient extends BaseClient {
  /**
   * Create a new axios instance with these custom options.
   */
  constructor() {
    const options: AxiosRequestConfig = {
      baseURL: `http://localhost:8080/users`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    super(options);
  }

  // placeholder
}
