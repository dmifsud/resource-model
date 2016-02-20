import { TypeBinding, Kernel, TypeBindingScopeEnum , Inject} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {ModelInterface, Model, index} from "../../lib/ModelLayer/Model/Model";
import {API,BaseUrl,ApiResource} from "../../lib/APILayer/API";
import {DefaultApi} from "../DataLayer/DefaultApi";
import {SourceInterface} from "../../lib/SourceLayer/Sourceful";

var kernel = new Kernel();

class UserModel extends Model{
  @index
  id: number;
  name: string;
  surname: string;
}


@BaseUrl("/users")
@Inject("DataInterface", "ModelInterface")
class UserResource extends ApiResource<UserModel>{
  //extra implementation
}



// // bind
kernel.bind(new TypeBinding<ModelInterface>("ModelInterface", UserModel, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<DataInterface>("DataInterface", DefaultApi, TypeBindingScopeEnum.Singleton));
kernel.bind(new TypeBinding<SourceInterface>("SourceInterface", UserResource));

// kernel.bind(new TypeBinding<FooInterface>("FooInterface", Bar));

//experimenting. Will need refactor
export class UserApiResource{
  container: UserResource;

  constructor(){
    this.container = UserApiResource.one();
  }

  static one(id?: any) : UserResource{
    var newResource = kernel.resolve<UserResource>("SourceInterface");

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    return newResource;
  }

  static many(): Array<UserResource>{//Return a specific class containing a list of UserResources
    return null;
  }
}
