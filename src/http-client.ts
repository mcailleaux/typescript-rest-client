import { Observable } from 'rxjs';

export interface IHttpClient {
  request(req: any): Observable<any>;
}
