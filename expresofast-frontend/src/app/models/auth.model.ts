export interface AuthResponse {
  token: string;
  username: string;
  roles: string[];
  expirationTime: number;
}