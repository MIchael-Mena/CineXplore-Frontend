export interface ApiResponse<T> {
  status?: number;
  success: boolean;
  message: string | string[];
  data?: T;
  timestamp: string;
}
