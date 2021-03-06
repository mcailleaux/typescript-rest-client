import { RestClient } from '../rest-client';
import { Observable } from 'rxjs';

/**
 * Called just before emitting the request, used to add functions to the observable
 * @param emitter function to add functions to the observable
 */
export function OnEmit(emitter: (resp: Observable<any>) => Observable<any>) {
  return (target: RestClient, propertyKey: string, descriptor: any) => {
    if (descriptor.emitters == null) {
      descriptor.emitters = [];
    }
    descriptor.emitters.push(emitter);
    return descriptor;
  };
}
