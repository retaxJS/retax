export interface IConfigStore<T> {
  /**
   * Current config
   */
  config: T;

  mergeConfig(c: T): void;
}
