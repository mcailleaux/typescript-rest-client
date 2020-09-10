export interface IHttpHeaders {
  has(name: string): boolean;

  append(name: string, value: string | string[]): any;

  set(name: string, value: string | string[]): any;
}
