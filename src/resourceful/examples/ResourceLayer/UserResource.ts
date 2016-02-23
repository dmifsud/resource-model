import { TypeBinding, Kernel, TypeBindingScopeEnum , Inject} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {ModelInterface, Model, index} from "../../lib/ModelLayer/Model/Model";
import {API,BaseUrl,ApiResource} from "../../lib/APILayer/API";
import {DefaultApi} from "../DataLayer/DefaultApi";
import {SourceInterface} from "../../lib/SourceLayer/Sourceful";
import {Resource} from "../../lib/SourceLayer/Resourceful";
import {RelationalInterface} from "../../lib/SourceLayer/Relational";
import {UserModel} from "../ModelLayer/UserModel";
import {Conf} from "./kernel";

//hobby
import {HobbySourceInterface,HobbyRelationalInterface,HobbyRelational,HobbyResource} from "./HobbyResource";
import {HobbyModelInterface,HobbyModel} from "../ModelLayer/HobbyModel";

var kernel = Conf.getKernel();



interface UserSourceInterface extends SourceInterface{}


@BaseUrl("/users")
@Inject("DataInterface", "ModelInterface", "HobbyRelationalInterface")
class UserResource extends ApiResource<UserModel> implements UserSourceInterface{
  //extra implementation
  constructor(data: DataInterface, model: ModelInterface, hobby: HobbyRelationalInterface){
    super(data, <UserModel>model);
    this.Hobby = hobby;
  }

  //@bindTo("hobby")
  Hobby: HobbyRelationalInterface;
}

// // bind
kernel.bind(new TypeBinding<ModelInterface>("ModelInterface", UserModel, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<DataInterface>("DataInterface", DefaultApi, TypeBindingScopeEnum.Singleton));
kernel.bind(new TypeBinding<UserSourceInterface>("UserSourceInterface", UserResource));

//relations
kernel.bind(new TypeBinding<HobbyRelationalInterface>("HobbyRelationalInterface", HobbyRelational, TypeBindingScopeEnum.Transient));



//TODO: temporary solution
// export class UserApiResource extends Resource<UserResource>{
//   constructor(){
//     super("SourceInterface", kernel);
//   }
//
//   static one(id?: any) : UserResource{
//     return Resource.one<UserResource>("SourceInterface", kernel, id);
//   }
// }




export interface UserRelationalInterface extends RelationalInterface<UserResource>{
  one(id?: any) : UserResource;
}

class UserRelational implements UserRelationalInterface{

  getParentBaseUrl() : string{
    return null;
  }

  one(id?: any) : UserResource{
    var newResource = kernel.resolve<UserResource>("UserSourceInterface");

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    //TODO: somehow need to set parent baseUrl to newResource
    return newResource;
  }

}

kernel.bind(new TypeBinding<UserRelationalInterface>("UserRelationalInterface", UserRelational, TypeBindingScopeEnum.Transient));

export class User{
  static getUserApiResource() : UserRelational{
    return kernel.resolve<UserRelational>("UserRelationalInterface");
  }
}
