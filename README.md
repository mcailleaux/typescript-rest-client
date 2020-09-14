# typescript-rest-client

Generic HTTP client with Typescript Declarative Annotations, Observables, Interceptors and Timeouts.
This package is production ready.

## Installation

```sh
yarn add typescript-rest-client
```

or

```sh
npm install typescript-rest-client --save
```

## Example with Angular

This lib allow you to use an @Client preconfigured for angular : https://www.npmjs.com/package/typescript-angular-rest-client

```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
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
import { environment } from '@environments';
import { IUser } from '@model/user';

@Injectable({
  providedIn: 'root',
})
@Client({
  serviceId: () => 'user',
  baseUrl: () => environment.config.apis.rootUrl,
  headers: () => {
    return { 'x-request-type': 'API' };
  },
  newHttpRequest: (method, resUrl, body, init) =>
    new HttpRequest(method, resUrl, body, init),
  newHttpParams: () => new HttpParams(),
  newHttpHeaders: (defaultHeaders) => new HttpHeaders(defaultHeaders),
  defaultResponseBody: (res) => {
    return res.body;
  },
  skipResponse: (res) => HttpEventType.Sent === res.type,
})
export class UserService extends RestClient {
  private static readonly url = 'users';

  constructor(private http: HttpClient) {
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
    @Body user: IUser
  ): Observable<IUser> {
    return null;
  }

  @Delete(() => `/${UserService.url}/{id}`)
  public deleteUser(@Path('id') id: number): Observable<void> {
    return null;
  }
}
```

## Example with Nest

This lib allow you to use an @Client preconfigured for nest : https://www.npmjs.com/package/typescript-nest-rest-client

```ts
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
    }
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
    @Body user: IUser
  ): Observable<IUser> {
    return null;
  }

  @Delete(() => `/${UserService.url}/{id}`)
  public deleteUser(@Path('id') id: number): Observable<void> {
    return null;
  }
}
```

## API Docs

### RestClient

#### Methods:

- `getServiceId(): string`: returns the serviceId of the RestClient
- `getBaseUrl(): string`: returns the base url of RestClient
- `getDefaultHeaders(): Object`: returns the default headers of RestClient in a key-value pair
- `getNewHttpParams(): IHttpParams`: return an instance of http params object used by httpClient lib
- `getNewHttpRequest(): IHttpRequest`: return an instance of http request object used by httpClient lib
- `getNewHttpHeaders(): IHttpHeaders`: return an instance of http headers object used by httpClient lib
- `defaultResponseBody(): any`: return the body content from response object
- `skipResponse(): boolean`: condition to skip response notification

### Class decorators:

- `@Client(args:{ serviceId?: () => string; baseUrl?: () => string; headers?: () => any; newHttpParams: () => IHttpParams; newHttpRequest: ( method: string, resUrl: string, body: any, init: { headers: any; params: any; withCredentials: boolean } ) => IHttpRequest; newHttpHeaders: (defaultHeaders?: { [name: string]: string }) => IHttpHeaders; defaultResponseBody: (res) => any; skipResponse: (res) => boolean; })`

### Method decorators:

- `@Get(url: () => string)`
- `@Post(url: () => string)`
- `@Put(url: () => string)`
- `@Patch(url: () => string)`
- `@Delete(url: () => string)`
- `@Head(url: () => string)`
- `@Headers(headers: Object)`
- `@Map(mapper:(resp : any)=>any)`
- `@OnEmit(emitter:(resp : Observable<any>)=>Observable<any>)`
- `@Timeout(timeout: number)`

### Parameter decorators:

- `@Path(name: string, value?:any|{value?:any})`
- `@Query(name: string, value?:any|{value?:any,format?:string})`
- `@Header(name: string, value?:any|{value?:any,format?:string})`
- `@Body`
- `@Search`

#### Collection Format

Determines the format of the array if type array is used. (used for `@Query` and `@Header`) Possible values are:

- `Format.CSV` - comma separated values `foo,bar`.
- `Format.SSV` - space separated values `foo bar`.
- `Format.TSV` - tab separated values `foo\tbar`.
- `Format.PIPES` - pipe separated values `foo|bar`.
- `Format.MULTI` - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters in "query" or "formData".

Default value is `Format.CSV`.

### Default usage

- If it is not specified, request headers contain : 'content-type': 'application/json'
- Default Produces is JSON

# License

MIT
