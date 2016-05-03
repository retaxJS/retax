abstract class CookieProxy {
  get authToken(): string {
    return this._readAuthToken();
  }

  set authToken(token: string) {
    this._setAuthToken(token);
  }

  protected abstract _setAuthToken(token: string): void;
  protected abstract _readAuthToken(): string;
}

export default CookieProxy;
