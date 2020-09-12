/**
 * Configure the REST Client
 * @param {String} args.url - base URL
 * @param {String} args.serviceId - Service ID
 * @param {Object} args.headers - default headers in a key-value pair
 */
import { IHttpParams } from '../http-params';
import { IHttpRequest } from '../http-request';
import { IHttpHeaders } from '../http-headers';

export function Client(args: {
  serviceId?: () => string;
  baseUrl?: () => string;
  headers?: () => any;
  newHttpParams: () => IHttpParams;
  newHttpRequest: (
    method: string,
    resUrl: string,
    body: any,
    init: { headers: any; params: any; withCredentials: boolean }
  ) => IHttpRequest;
  newHttpHeaders: (defaultHeaders?: { [name: string]: string }) => IHttpHeaders;
  defaultResponseBody: (res) => any;
  skipResponse?: (res) => boolean;
}) {
  return <T extends Function>(Target: T): T => {
    if (args.serviceId != null) {
      Target.prototype.getServiceId = args.serviceId;
    }
    if (args.baseUrl != null) {
      Target.prototype.getBaseUrl = args.baseUrl;
    }
    if (args.headers != null) {
      Target.prototype.getDefaultHeaders = args.headers;
    }
    if (args.newHttpParams != null) {
      Target.prototype.getNewHttpParams = args.newHttpParams;
    }
    if (args.newHttpRequest != null) {
      Target.prototype.getNewHttpRequest = args.newHttpRequest;
    }
    if (args.newHttpHeaders != null) {
      Target.prototype.getNewHttpHeaders = args.newHttpHeaders;
    }
    if (args.defaultResponseBody != null) {
      Target.prototype.defaultResponseBody = args.defaultResponseBody;
    }
    if (args.skipResponse != null) {
      Target.prototype.skipResponse = args.skipResponse;
    }
    return Target;
  };
}
