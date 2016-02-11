import {Promise} from "es6-promise";

export interface IData<T>{

  save<S>(reference: any, data : Object, success? : Function, fail?: Function) : S;

  get(reference: any, success? : Function, fail?: Function) : T;

  delete<D>(reference: any, success? : Function, fail?: Function): D;
}
