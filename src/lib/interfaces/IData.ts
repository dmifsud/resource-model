import {Promise} from "es6-promise";

export interface IData<T>{

  save(reference: any, dataLogic : Function) : T;

  get(reference: any, dataLogic : Function) : T;

  delete(reference: any, dataLogic? : Function): T;
}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return this.api.baseURL + url;
        };
        return Target;
    };
}
