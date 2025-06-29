import type { User } from '../models/User';
import type { ApiResponse } from '../models/ApiResponse';
import { ApiService } from './api.service';
import apiEndpoints from '../constants/apiEndpoints';
import type { AuthData } from '../models/AuthData';

// Este servicio no maneja los errores de la API, eso se maneja en las acciones de Redux que llaman a este servicio
export class AuthService extends ApiService {
  // private static authEndpoint: string = '/auth';

  private constructor() {
    super();
  }

  public static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<AuthData>> {
    const response = await this.instanceAxios.post<ApiResponse<AuthData>>(
      apiEndpoints.auth.login,
      {
        email,
        password,
      }
    );
    localStorage.setItem('token', response.data.data?.token!);
    return response.data;
  }

  public static logout() {
    localStorage.removeItem('token');
  }

  public static async register(user: User): Promise<ApiResponse<AuthData>> {
    const response = await this.instanceAxios.post<ApiResponse<AuthData>>(
      apiEndpoints.auth.register,
      user
    );
    localStorage.setItem('token', response.data.data?.token!);
    return response.data;
  }

  public static async authenticate(): Promise<ApiResponse<AuthData>> {
    try {
      const response = await this.instanceAxios.post<ApiResponse<AuthData>>(
        apiEndpoints.auth.refreshToken
      );

      localStorage.setItem('token', response.data.data?.token!);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  }
}
