import { TypeBinding, Kernel, TypeBindingScopeEnum , Inject} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {ModelInterface, Model, index} from "../../lib/ModelLayer/Model/Model";
import {API,BaseUrl,ApiResource} from "../../lib/APILayer/API";
import {DefaultApi} from "../DataLayer/DefaultApi";
import {SourceInterface} from "../../lib/SourceLayer/Sourceful";
import {Resource} from "../../lib/SourceLayer/Resourceful";
import {UserModel} from "../ModelLayer/UserModel";

var kernel = new Kernel();

@BaseUrl("/users")
@Inject("DataInterface", "ModelInterface")
class UserResource extends ApiResource<UserModel>{
  //extra implementation
}

// // bind
kernel.bind(new TypeBinding<ModelInterface>("ModelInterface", UserModel, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<DataInterface>("DataInterface", DefaultApi, TypeBindingScopeEnum.Singleton));
kernel.bind(new TypeBinding<SourceInterface>("SourceInterface", UserResource));


export class UserApiResource extends Resource<UserResource>{
  constructor(){
    super("SourceInterface", kernel);
  }

  static one(id?: any) : UserResource{
    return Resource.one<UserResource>("SourceInterface", kernel, id);
  }
}

@Inject("SourceInterface")
export class TestResource{
  one(): void{
    console.log('one worked');
  }
}

export  kernel.resolve<Resource>("Resource");
