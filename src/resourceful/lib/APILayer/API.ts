import {Source} from "../SourceLayer/Sourceful";
import {ModelInterface} from "../ModelLayer/Model/Model";

export abstract class API{

  protected getBaseUrl() : string{
      throw Error("@BaseUrl annotation not found");
      return null;
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


export class ApiResource<M extends ModelInterface>  extends Source<M>{

  protected getBaseUrl() : string{
    return null;
  }

  getReferenceIdentifier(overrideId? : any) : string{
      return this.getBaseUrl() + "/" + (super.getReferenceIdentifier(overrideId) || "");
  }
}
