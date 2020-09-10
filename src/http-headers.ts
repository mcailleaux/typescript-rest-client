export interface IHttpHeaders {
  has(name: string): boolean;

  append<T>(name: string, value: string | string[]): T;

  set<T>(name: string, value: string | string[]): T;
}
