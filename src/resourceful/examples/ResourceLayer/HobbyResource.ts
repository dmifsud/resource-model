import {SourceInterface} from "../../lib/SourceLayer/Sourceful";
import {ApiResource,BaseUrl} from "../../lib/APILayer/API";
import {RelationalInterface} from "../../lib/SourceLayer/Relational";
import {ModelInterface,Model} from "../../lib/ModelLayer/Model/Model";


import {HobbyModel, HobbyModelInterface} from "../ModelLayer/HobbyModel";
import {Inject,TypeBindingScopeEnum,TypeBinding} from "inversify";
import {Conf} from "./kernel";

var kernel = Conf.getKernel();


export interface HobbySourceInterface extends SourceInterface{}

@BaseUrl("/hobby")
@Inject("DataInterface", "HobbyModelInterface")
export class HobbyResource extends ApiResource<HobbyModel> implements HobbySourceInterface{
  //extra implementation

}



// class Relational<R extends SourceInterface> implements RelationalInterface<R>{
//   one(id?: any) : R{
//     var newResource = kernel.resolve<R>("HobbySourceInterface");
//
//     if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
//       newResource.model[newResource.model.getIdentifierProperty()] = id;
//     }
//     return newResource;
//   }
// }



export interface HobbyRelationalInterface extends RelationalInterface<HobbyResource>{
  one(id?: any) : HobbyResource;
}



export class HobbyRelational implements HobbyRelationalInterface{

  getParentBaseUrl() : string{
    //return null; //TODO: required from decorator
    return "/users/32/";
  }

  one(id?: any) : HobbyResource{
    var newResource = kernel.resolve<HobbyResource>("HobbySourceInterface");

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    //TODO: somehow need to set parent baseUrl to newResource
    return newResource;
  }

}

//hobby bind
kernel.bind(new TypeBinding<ModelInterface>("HobbyModelInterface", HobbyModel, TypeBindingScopeEnum.Transient));

kernel.bind(new TypeBinding<HobbySourceInterface>("HobbySourceInterface", HobbyResource));
