import { IHttpClient } from './http-client';
import { Observable } from 'rxjs';
import { IHttpParams } from './http-params';
import { IHttpRequest } from './http-request';
import { IHttpHeaders } from './http-headers';

/**
 * Generic RestClient class.
 *
 * @class RestClient
 * @constructor
 */
export class RestClient {
  public constructor(public httpClient: IHttpClient) {}

  public getServiceId(): string {
    return null;
  }

  public getBaseUrl(): string {
    return null;
  }

  public getDefaultHeaders(): { [name: string]: string } {
    return null;
  }

  public getNewHttpParams(): IHttpParams {
    return null;
  }

  public getNewHttpRequest(
    method: string,
    resUrl: string,
    body: any,
    init: { headers: any; params: any; withCredentials: boolean }
  ): IHttpRequest {
    return null;
  }

  public getNewHttpHeaders(defaultHeaders?: {
    [name: string]: string;
  }): IHttpHeaders {
    return null;
  }

  /**
   * Request Interceptor
   *
   * @method requestInterceptor
   * @param {T} req - request object
   */
  protected requestInterceptor<T>(req: T): void {
    //
  }

  /**
   * Response Interceptor
   *
   * @method responseInterceptor
   * @param {T} res - response object
   * @returns {Observable} res - transformed response object
   */
  protected responseInterceptor<T>(res: Observable<T>): Observable<any> {
    return res;
  }
}
