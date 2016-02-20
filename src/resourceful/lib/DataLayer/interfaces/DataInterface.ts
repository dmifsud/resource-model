/// <reference path="../../Resourceful.ts" />
import {Promise} from "es6-promise";
// module Resourceful{
    export interface DataInterface{

        create<S>(reference: any, data : Object, success? : Function, fail?: Function) : S;

        update<U>(reference: any, data : Object, success? : Function, fail?: Function) : U;

        delete<D>(reference: any, success? : Function, fail?: Function): D;

        get<G>(reference: any, success? : Function, fail?: Function) : G;

    }
// }
