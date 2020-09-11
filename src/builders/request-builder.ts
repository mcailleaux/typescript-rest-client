import { RestClient } from '../rest-client';
import { Observable } from 'rxjs';
import { Format } from '../decorators/parameters';
import { IHttpParams } from '../http-params';
import { IHttpHeaders } from '../http-headers';
import { IHttpRequest } from '../http-request';
import { IHttpClient } from '../http-client';
import { map, timeout } from 'rxjs/operators';
import { ISearch } from '../search';
import { ISort } from '../sort';

export function methodBuilder(method: string) {
  return (url: () => string) => {
    return (target: RestClient, propertyKey: string, descriptor: any) => {
      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pSearch = target[`${propertyKey}_Search_parameters`];
      const pPlainBody = target[`${propertyKey}_PlainBody_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function (...args: any[]) {
        // Body
        let body: any = null;
        if (pBody != null) {
          if (pBody.length > 1) {
            throw new Error('Only one @Body is allowed');
          }
          let value = args[pBody[0].parameterIndex];
          if (value == null && pBody[0].value != null) {
            value = pBody[0].value;
          }
          body = JSON.stringify(value);
        }
        if (pPlainBody != null) {
          if (pPlainBody.length > 1) {
            throw new Error('Only one @Body is allowed');
          }
          let value = args[pPlainBody[0].parameterIndex];
          if (value == null && pPlainBody[0].value != null) {
            value = pPlainBody[0].value;
          }
          body = value;
        }
        // Path
        let resUrl: string = url();
        if (pPath != null) {
          for (const k in pPath) {
            if (pPath.hasOwnProperty(k)) {
              let value: any = args[pPath[k].parameterIndex];
              if (value == null && pPath[k].value != null) {
                value = pPath[k].value;
              }
              if (value != null) {
                resUrl = resUrl.replace('{' + pPath[k].key + '}', value);
              } else {
                throw new Error(
                  "Missing path variable '" + pPath[k].key + "' in url " + url()
                );
              }
            }
          }
        }
        if (this.getBaseUrl() != null) {
          let baseUrl = this.getBaseUrl();
          if (
            baseUrl.indexOf('/') === baseUrl.length - 1 &&
            resUrl.indexOf('/') === 0
          ) {
            baseUrl = baseUrl.substring(0, 1);
          }
          resUrl = baseUrl + resUrl;
        }

        // Query
        let params: IHttpParams = target.getNewHttpParams();
        if (pQuery != null) {
          pQuery
            .filter(
              (p: any) => args[p.parameterIndex] != null || p.value != null
            ) // filter out optional parameters
            .forEach((p: any) => {
              const key = p.key;
              let value: any = args[p.parameterIndex];
              if (value == null && p.value != null) {
                value = p.value;
              }

              // if the value is a instance of Object, we stringify it
              if (Array.isArray(value)) {
                switch (p.format) {
                  case Format.CSV:
                    value = value.join(',');
                    break;
                  case Format.SSV:
                    value = value.join(' ');
                    break;
                  case Format.TSV:
                    value = value.join('\t');
                    break;
                  case Format.PIPES:
                    value = value.join('|');
                    break;
                  case Format.MULTI:
                    break;
                  default:
                    value = value.join(',');
                }
              } else if (value instanceof Object) {
                value = JSON.stringify(value);
              }
              if (Array.isArray(value)) {
                value.forEach((v) => (params = params.append(key, v)));
              } else {
                params = params.set(key, value);
              }
            });
        }
        if (pSearch != null) {
          if (pSearch.length > 1) {
            throw new Error('Only one @Search is allowed');
          }
          let search: ISearch = args[pSearch[0].parameterIndex];
          if (search == null && pSearch[0].value != null) {
            search = pSearch[0].value;
          }
          if (search != null) {
            const searchParams: any = {};
            if (search.paginate != null) {
              searchParams.page = search.paginate.page;
              searchParams.nbrPerPage = search.paginate.nbrPerPage;
            }

            if (search.sorts?.length > 0) {
              searchParams.sortBy = [];
              search.sorts.forEach((sort: ISort) => {
                const asc = sort.asc != null && sort.asc ? 'asc' : 'desc';
                searchParams.sortBy.push(`${sort.path}.${asc}`);
              });
            }

            if (search.filter != null) {
              searchParams.filter = search.filter;
            }

            for (const [key, value] of Object.entries<string>(searchParams)) {
              if (value != null) {
                params = params.set(key, value);
              }
            }
          }
        }

        // Headers
        // set class default headers
        let headers: IHttpHeaders = target.getNewHttpHeaders({
          ...{ 'content-type': 'application/json' },
          ...this.getDefaultHeaders(),
        });

        // set method specific headers
        for (const k in descriptor.headers) {
          if (descriptor.headers.hasOwnProperty(k)) {
            if (headers.has(k)) {
              headers = headers.append(k, descriptor.headers[k] + '');
            } else {
              headers = headers.set(k, descriptor.headers[k] + '');
            }
          }
        }
        // set parameter specific headers
        if (pHeader != null) {
          for (const k in pHeader) {
            if (pHeader.hasOwnProperty(k)) {
              let value: any = args[pHeader[k].parameterIndex];
              if (value == null && pHeader[k].value != null) {
                value = pHeader[k].value;
              }
              if (Array.isArray(value)) {
                switch (pHeader[k].format) {
                  case Format.CSV:
                    value = value.join(',');
                    break;
                  case Format.SSV:
                    value = value.join(' ');
                    break;
                  case Format.TSV:
                    value = value.join('\t');
                    break;
                  case Format.PIPES:
                    value = value.join('|');
                    break;
                  case Format.MULTI:
                    break;
                  default:
                    value = value.join(',');
                }
              }
              if (Array.isArray(value)) {
                value.forEach(
                  (v) => (headers = headers.append(pHeader[k].key, v + ''))
                );
              } else {
                headers = headers.append(pHeader[k].key, value + '');
              }
            }
          }
        }

        // Build Request
        const req: IHttpRequest = target.getNewHttpRequest(
          method,
          resUrl,
          body,
          {
            headers: headers,
            params: params,
            withCredentials: false,
          }
        );

        // intercept the request
        this.requestInterceptor(req);
        // make the request and store the observable for later transformation
        let observable: Observable<any> = (<IHttpClient>(
          this.httpClient
        )).request(req);

        // transform the observable in accordance to the @Produces decorator
        if (descriptor.mime == null) {
          descriptor.mime = (res: IHttpRequest) => res.body;
        }
        observable = observable.pipe(map(descriptor.mime));

        if (descriptor.timeout != null) {
          descriptor.timeout.forEach((tout: number) => {
            observable = observable.pipe(timeout(tout));
          });
        }
        if (descriptor.mappers != null) {
          descriptor.mappers.forEach((mapper: (resp: any) => any) => {
            observable = observable.pipe(map(mapper));
          });
        }
        if (descriptor.emitters != null) {
          descriptor.emitters.forEach(
            (handler: (resp: Observable<any>) => Observable<any>) => {
              observable = handler(observable);
            }
          );
        }

        // intercept the response
        observable = this.responseInterceptor(observable);

        return observable;
      };

      return descriptor;
    };
  };
}
