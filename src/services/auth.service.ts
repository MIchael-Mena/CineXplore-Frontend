import type { User } from '../models/User';
import type { ApiResponse } from '../models/ApiResponse';
import { ApiService } from './api.service';

export class AuthService extends ApiService {
  private static authEndpoint: string = '/auth';

  constructor() {
    super();
  }

  public static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<User>> {
    const response = await this.instanceAxios.post<ApiResponse<User>>(
      this.authEndpoint + '/login',
      {
        email,
        password,
      }
    );
    localStorage.setItem('token', response.data.token!);
    return response.data;
  }

  public static logout() {
    localStorage.removeItem('token');
  }

  public static async register(user: User): Promise<ApiResponse<User>> {
    const response = await this.instanceAxios.post<ApiResponse<User>>(
      this.authEndpoint + '/register',
      user
    );
    localStorage.setItem('token', response.data.token!);
    return response.data;
  }

  public static async authenticate(): Promise<ApiResponse<User>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<User>>(
        this.authEndpoint + '/authenticate' // Endpoint para refrescar el token
      );
      localStorage.setItem('token', response.data.token!);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  }
}
