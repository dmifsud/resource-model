import {Promise} from "es6-promise";

export interface IAPI{

  baseUrl : string;

  save(url : string, model : any) : Promise<any>;

  get(url : string, id?: any) : Promise<any>;

  delete(url : string): Promise<any>;
}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return this.api.baseURL + url;
        };
        return Target;
    };
}
