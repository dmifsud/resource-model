import {SourceInterface} from "./Sourceful";

export interface RelationalInterface<R extends SourceInterface>{
  getParentBaseUrl() : string;

  one(id?: any) : R;
}


export function bindTo(propertyName: string){

return function <T extends Function>(target: T){
target.prototype.getParentBaseUrl = function() : string{
    return "/yousa" + "/32/";
  };

  }
}
