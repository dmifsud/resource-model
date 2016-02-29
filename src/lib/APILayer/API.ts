import {Source,SourceInterface} from "../SourceLayer/Sourceful";
import {ModelInterface} from "../ModelLayer/Model/Model";
import {BindingInterface} from "../SourceLayer/Relational";

export abstract class API{

  protected getBaseUrl() : string{
      throw Error("@BaseUrl annotation not found");
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

export interface ApiResourceInterface extends SourceInterface{
  getReferenceIdentifier() : string;
  setParent(value: ApiResourceInterface) : void;
  getBaseUrl() : string;
}

export class ApiResource<M extends ModelInterface>  extends Source<M> implements ApiResourceInterface{

  protected _parent : ApiResourceInterface;

  getBaseUrl() : string{
    return null;
  }

  getReferenceIdentifier(overrideId? : any) : string{
      var parentUrl: string = "";
      if (typeof this._parent !== "undefined"){
        parentUrl = this._parent.getReferenceIdentifier();
      }
      return parentUrl + this.getBaseUrl() + "/" + (super.getReferenceIdentifier(overrideId) || "");
  }

  public setParent(value: ApiResourceInterface):void{
    this._parent = value;
  }
}
