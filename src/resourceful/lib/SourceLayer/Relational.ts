import {SourceInterface} from "./Sourceful";
import {Kernel} from "inversify";

export interface RelationalInterface<R extends SourceInterface>{
  getParentBaseUrl() : string;

  one(id?: any) : R;
}

export class Relational<R extends SourceInterface> implements RelationalInterface<R>{
  getParentBaseUrl() : string{
    return null;
  }

  constructor(public interfaceName: string, public kernel: Kernel){}

  one(id?: any) : R{
    var newResource = this.kernel.resolve<R>(this.interfaceName);

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    //TODO: somehow need to set parent baseUrl to newResource
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
