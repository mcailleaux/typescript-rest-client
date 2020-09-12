import { Observable } from 'rxjs';
import {
  Body,
  Client,
  Delete,
  Get,
  Path,
  Post,
  Put,
  RestClient,
} from 'typescript-rest-client';
import { v4 as uuidV4 } from 'uuid';
import { environment } from './environments/environment';
import { IUser } from './model/user';
import { HttpService, Injectable } from '@nestjs/common';

export class HttpHeaders {
  public headers: { [key: string]: string } = {};

  constructor(headers?: { [key: string]: string }) {
    this.headers = headers;
  }

  public append(name: string, value: string): any {
    this.set(name, value);
    return this;
  }

  public has(name: string): boolean {
    return this.headers[name.toLowerCase()] != null;
  }

  public set(name: string, value: string): any {
    this.headers[name.toLowerCase()] = value;
    return this;
  }
}

export class HttpParams {
  public params: { [key: string]: string[] } = {};

  public append(name: string, value: string): any {
    if (!this.has(name)) {
      this.set(name, value);
    }
    this.params[name.toLowerCase()].push(value);
    return this;
  }

  public has(name: string): boolean {
    return this.params[name.toLowerCase()] != null;
  }

  public set(name: string, value: string): any {
    this.params[name.toLowerCase()] = [value];
    return this;
  }
}

@Injectable()
@Client({
  serviceId: () => 'user',
  baseUrl: () => environment.config.apis.rootUrl,
  headers: () => {
    return { 'x-request-type': 'API' };
  },
  newHttpHeaders: (defaultHeaders?: { [name: string]: string }) =>
    new HttpHeaders(defaultHeaders),
  newHttpParams: () => new HttpParams(),
  newHttpRequest: (
    method: string,
    resUrl: string,
    body: any,
    init: {
      headers: HttpHeaders;
      params: HttpParams;
      withCredentials: boolean;
    },
  ) =>
    <any>{
      url: resUrl,
      method: method,
      body: body,
      data: body,
      headers: init.headers.headers,
      params: init.params.params,
      withCredentials: init.withCredentials,
    },
  defaultResponseBody: (res) => res.data,
})
export class UserService extends RestClient {
  private static readonly url = 'users';

  constructor(private http: HttpService) {
    super(http);
  }

  public getDefaultHeaders(): { [p: string]: string } {
    return { 'x-request-id': uuidV4() };
  }

  protected requestInterceptor<T>(req: T) {
    console.dir(req);
  }

  protected responseInterceptor<T>(res: Observable<T>): Observable<any> {
    console.dir(res);
    return res;
  }

  @Get(() => `/${UserService.url}`)
  public getUsers(): Observable<IUser[]> {
    return null;
  }

  @Get(() => `/${UserService.url}/{id}`)
  public getUser(@Path('id') id: number): Observable<IUser> {
    return null;
  }

  @Post(() => `/${UserService.url}`)
  public createUser(@Body user: IUser): Observable<IUser> {
    return null;
  }

  @Put(() => `/${UserService.url}/{id}`)
  public editUser(
    @Path('id') id: number,
    @Body user: IUser,
  ): Observable<IUser> {
    return null;
  }

  @Delete(() => `/${UserService.url}/{id}`)
  public deleteUser(@Path('id') id: number): Observable<void> {
    return null;
  }
}
