import { TypeBinding, Kernel, TypeBindingScopeEnum , Inject} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {ModelInterface, Model, index} from "../../lib/ModelLayer/Model/Model";
import {API,BaseUrl,ApiResource} from "../../lib/APILayer/API";
import {DefaultApi} from "../DataLayer/DefaultApi";
import {SourceInterface} from "../../lib/SourceLayer/Sourceful";

var kernel = new Kernel();



interface HobbyModelInterface extends ModelInterface{}

class HobbyModel extends Model implements HobbyModelInterface{
  @index
  id: number = 1;
  name: string = "Gaming";
}

interface HobbySourceInterface extends SourceInterface{}

@BaseUrl("/hobby")
@Inject("DataInterface", "HobbyModelInterface")
class HobbyResource extends ApiResource<HobbyModel> implements HobbySourceInterface{
  //extra implementation

}

interface RelationalInterface<R extends SourceInterface>{
  getParentBaseUrl() : string;

  one(id?: any) : R;
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



interface HobbyRelationalInterface extends RelationalInterface<HobbyResource>{
  one(id?: any) : HobbyResource;
}


function bindTo(propertyName: string){

return function <T extends Function>(target: T){
target.prototype.getParentBaseUrl = function() : string{
    return "/yousa" + "/32/";
  };

  }
}


export class HobbyApiResource implements HobbyRelationalInterface{

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


class UserModel extends Model{
  @index
  id: number;
  name: string;
  surname: string;
  hobby: HobbyModel;
}

interface UserSourceInterface extends SourceInterface{}


@BaseUrl("/users")
@Inject("DataInterface", "ModelInterface", "HobbyRelational")
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
kernel.bind(new TypeBinding<HobbyRelationalInterface>("HobbyRelational", HobbyApiResource, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<UserSourceInterface>("UserSourceInterface", UserResource));


//hobby bind
kernel.bind(new TypeBinding<ModelInterface>("HobbyModelInterface", HobbyModel, TypeBindingScopeEnum.Transient));

kernel.bind(new TypeBinding<HobbySourceInterface>("HobbySourceInterface", HobbyResource));


//experimenting. Will need refactor
export class UserApiResource{
  container: UserResource;

  constructor(){
    this.container = UserApiResource.one();
  }

  static one(id?: any) : UserResource{
    var newResource = kernel.resolve<UserResource>("UserSourceInterface");

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      //newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    return newResource;
  }

  static many(): Array<UserResource>{//Return a specific class containing a list of UserResources
    return null;
  }
}
