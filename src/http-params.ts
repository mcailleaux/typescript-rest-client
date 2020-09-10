export interface IHttpParams {
  append(param: string, value: string): any;

  set(param: string, value: string): any;
}
