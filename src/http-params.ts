export interface IHttpParams {
  append<T>(param: string, value: string): T;

  set<T>(param: string, value: string): T;
}
