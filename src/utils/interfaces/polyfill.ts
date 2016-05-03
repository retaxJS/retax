/* tslint:disable */

interface Array<T> {
  /**
   * Whether the element is in the array
   */
  includes(e: T): boolean;
}

interface ObjectConstructor {
  /**
   * Return in a array all the values of an object
   */
  values<T>(map: { [key: string]: T; }): T[];

  /**
   * Return in a array all the values of an object
   */
  values<T>(map: { [key: number]: T; }): T[];

  /**
   * Return in a array all the entries (key, value) of an object
   */
  entries<T>(map: { [key: string]: T; }): Array<[ string, T ]>;
}
