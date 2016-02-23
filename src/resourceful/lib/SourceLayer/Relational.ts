import {SourceInterface} from "./Sourceful";
import {ApiResourceInterface} from "../APILayer/API";
import {Kernel} from "inversify";

export interface RelationalInterface<R extends SourceInterface>{
  getParentBaseUrl() : string;

  one(id?: any) : R;
}

export class Relational<R extends ApiResourceInterface> implements RelationalInterface<R>{
  getParentBaseUrl() : string{
    return null;
  }

  ParentReference : ApiResourceInterface;

  constructor(public interfaceName: string, public kernel: Kernel){}

  one(id?: any) : R{
    var newResource = this.kernel.resolve<R>(this.interfaceName);

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    //TODO: somehow need to set parent baseUrl to newResource
    for (var prop in newResource){
      if (newResource[prop] instanceof Relational){
        if (typeof newResource[prop].interfaceName !== "undefined"){
          console.log(newResource[prop].ParentReference = newResource);
        }
      }
    }

    if (typeof this.ParentReference !== "undefined"){
      newResource.setParent(this.ParentReference);
    }
    return newResource;
  }
}


export function bindTo(propertyName: string){

return function <T extends Function>(target: T){
target.prototype.getParentBaseUrl = function() : string{
    return "/yousa" + "/32/";
  };

  }
}
