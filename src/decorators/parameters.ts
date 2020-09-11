import { RestClient } from '../rest-client';

/**
 * collection Formats
 */
export const Format = {
  /**
   *  comma separated values foo,bar.
   */
  CSV: 'CSV',

  /**
   *  space separated values foo bar.
   */
  SSV: 'SSV',

  /**
   *  tab separated values foo\tbar.
   */
  TSV: 'TSV',

  /**
   *  pipe separated values foo|bar.
   */
  PIPES: 'PIPES',

  /**
   *  corresponds to multiple parameter instances instead of multiple values for a single instance foo=bar&foo=baz.
   *  This is valid only for parameters in "query" or "formData".
   */
  MULTI: 'MULTI',
};

export function paramBuilder(paramName: string) {
  return (name: string, value?: any | { value?: any; format?: string }) => {
    return (
      target: RestClient,
      propertyKey: string | symbol,
      parameterIndex: number
    ) => {
      let format;
      if (value != null) {
        if (typeof value === 'object') {
          if (value.value != null) {
            value = value.value;
          }
          if (value.format != null) {
            if (Format[value.format] != null) {
              format = value.format;
            } else {
              throw new Error(
                "Unknown Collection Format: '" + value.format + "'"
              );
            }
          }
        }
      }
      const metadataKey = `${propertyKey.toString()}_${paramName}_parameters`;
      const paramObj: any = {
        key: name,
        parameterIndex: parameterIndex,
        value: value,
        format: format,
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export const Path = paramBuilder('Path');

/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export const Query = paramBuilder('Query');

/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export const Body = paramBuilder('Body')('Body');

/**
 * Body of a REST method, type: key-value pair string separated by '&'
 * Only one body per method!
 */
export const PlainBody = paramBuilder('PlainBody')('PlainBody');

/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export const Header = paramBuilder('Header');

/**
 * Query search params of a REST method, type: ISearch object
 * Only one search per method!
 */
export const Search = paramBuilder('Search')('Search');
