import { methodBuilder } from '../builders/request-builder';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  JSONP = 'JSONP',
}

/**
 * Get method
 * @param {string} url - resource url of the method
 */
export const Get = methodBuilder(RequestMethod.GET);

/**
 * Post method
 * @param {string} url - resource url of the method
 */
export const Post = methodBuilder(RequestMethod.POST);

/**
 * Put method
 * @param {string} url - resource url of the method
 */
export const Put = methodBuilder(RequestMethod.PUT);

/**
 * Patch method
 * @param {string} url - resource url of the method
 */
export const Patch = methodBuilder(RequestMethod.PATCH);

/**
 * Delete method
 * @param {string} url - resource url of the method
 */
export const Delete = methodBuilder(RequestMethod.DELETE);

/**
 * Head method
 * @param {string} url - resource url of the method
 */
export const Head = methodBuilder(RequestMethod.HEAD);

/**
 * Options method
 * @param {string} url - resource url of the method
 */
export const Options = methodBuilder(RequestMethod.OPTIONS);

/**
 * JSONP method
 * @param {string} url - resource url of the method
 */
export const JsonP = methodBuilder(RequestMethod.JSONP);
