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

```ts
TODO;
```

### Using it in your component

**`app.module.ts`**

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [HttpModule],
  providers: [TodoClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**`todo.component.ts`**

```ts
// You need some or all of the following rxjs imports for Promise and Observable.
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'to-do',
})
export class ToDoCmp {

  constructor(private todoClient: TodoClient) {
  }

  // Use todoClient.
  sampleUsage() {
    this.todoClient.getTodos( /* page */ 1).subscribe(data=>{
      console.log(data)
    })
  }

  // Another example, using Promises.
  sampleUsage2() {
    this.todoClient.getTodos( /* page */ 1).toPromise()
      .then((response: Response) => console.log(response.json()))
      .catch(this.handleError);
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    console.log('ERROR');
    return Promise.reject(error.message || error);
  }
}
```

## Example with Nest

```ts
TODO;
```

## API Docs

### RestClient

#### Methods:

- `getServiceId(): string`: returns the serviceId of the RestClient
- `getBaseUrl(): string`: returns the base url of RestClient
- `getDefaultHeaders(): Object`: returns the default headers of RestClient in a key-value pair

### Class decorators:

- `@Client(args:{serviceId?: string, baseUrl?: string, headers?: any})`

### Method decorators:

- `@Get(url: String)`
- `@Post(url: String)`
- `@Put(url: String)`
- `@Patch(url: String)`
- `@Delete(url: String)`
- `@Head(url: String)`
- `@Headers(headers: Object)`
- `@Map(mapper:(resp : any)=>any)`
- `@OnEmit(emitter:(resp : Observable<any>)=>Observable<any>)`
- `@Timeout(timeout: number)`

### Parameter decorators:

- `@Path(name: string, value?:any|{value?:any})`
- `@Query(name: string, value?:any|{value?:any,format?:string})`
- `@Header(name: string, value?:any|{value?:any,format?:string})`
- `@Body`

#### Collection Format

Determines the format of the array if type array is used. (used for `@Query` and `@Header`) Possible values are:

- `Format.CSV` - comma separated values `foo,bar`.
- `Format.SSV` - space separated values `foo bar`.
- `Format.TSV` - tab separated values `foo\tbar`.
- `Format.PIPES` - pipe separated values `foo|bar`.
- `Format.MULTI` - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters in "query" or "formData".

Default value is `Format.CSV`.

# License

MIT
