import {Resource} from "./Resource";
import {SerializableModel} from "./SerializableModel";

export abstract class API{

  protected getBaseUrl() : string{
      return null;
  }
}

export class ApiResource<T extends SerializableModel> extends Resource<T>{

  protected getBaseUrl() : string{
    return null;
  }

  getReferenceIdentifier(overrideId? : any) : string{
      return this.getBaseUrl() + "/" + (super.getReferenceIdentifier(overrideId) || "");
  }
}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return url;
        };
        return Target;
    };
}
