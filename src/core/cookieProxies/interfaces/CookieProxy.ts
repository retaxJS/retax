export interface ICookieProxy {
  authToken: string;

  deleteAuthToken(): void;
}
