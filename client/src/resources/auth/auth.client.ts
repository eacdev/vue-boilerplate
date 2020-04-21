import { AxiosRequestConfig, AxiosResponse } from 'axios';
import BaseClient from '../base/base.client';
import User from '../user/user.model';
import { LoginUser, RegisterUser } from './auth.requests';

export default class AuthClient extends BaseClient {
  /**
   * Create a new axios instance with these custom options.
   */
  constructor() {
    const options: AxiosRequestConfig = {
      baseURL: `http://localhost:8080/auth`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    super(options);
  }

  /**
   * POST request on /auth/register.
   */
  public async register(request: RegisterUser): Promise<AxiosResponse<User>> {
    return this.post<User>('/register', request);
  }

  /**
   * POST request on /auth/login.
   */
  public async login(request: LoginUser): Promise<AxiosResponse<User>> {
    return this.post<User>('/login', request);
  }

  /**
   * POST request on /auth/me
   */
  public async me(): Promise<AxiosResponse<User>> {
    return this.get<User>('/me');
  }

  public async logout(): Promise<AxiosResponse<void>> {
    return this.get('/logout');
  }
}
