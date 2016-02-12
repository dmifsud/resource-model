import {Promise} from "es6-promise";

export interface IData<T>{

  save<S>(reference: any, data : Object, success? : Function, fail?: Function) : S;

  update<U>(reference: any, data : Object, success? : Function, fail?: Function) : U;

  get(reference: any, success? : Function, fail?: Function) : T;

  filter(reference: any) : IData<T>;

  delete<D>(reference: any, success? : Function, fail?: Function): D;
}
