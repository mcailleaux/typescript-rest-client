import { Observable } from 'rxjs';

export interface IHttpClient {
  request<R>(req: any): Observable<any>;
}
