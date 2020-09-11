import { RestClient } from '../rest-client';
import { IHttpRequest } from '../http-request';

/**
 * Defines the media type(s) that the methods can produce
 * @param {MediaType} mime type or custom mapper function
 */
export function Produces(mime: MediaType) {
  return (target: RestClient, propertyKey: string, descriptor: any) => {
    if (mime != null) {
      if (mime === MediaType.JSON) {
        descriptor.mime = (res: IHttpRequest) =>
          target.defaultResponseBody(res);
      }
    }
    return descriptor;
  };
}

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
}
