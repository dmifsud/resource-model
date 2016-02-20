import { TypeBinding, Kernel, TypeBindingScopeEnum , Inject} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {ModelInterface, Model, index} from "../../lib/ModelLayer/Model/Model";
import {API,BaseUrl,ApiResource} from "../../lib/APILayer/API";
import {DefaultApi} from "../DataLayer/DefaultApi";
import {SourceInterface} from "../../lib/SourceLayer/Sourceful";

var kernel = new Kernel();
class UserModel extends Model{
  @index
  id: number = 42;
  name: string = "David";
  surname: string = "Mifsud";
}


@BaseUrl("/users")
@Inject("DataInterface", "ModelInterface")
class UserResource extends ApiResource<UserModel>{
  //extra implementation
}



// // bind
kernel.bind(new TypeBinding<ModelInterface>("ModelInterface", UserModel, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<DataInterface>("DataInterface", DefaultApi, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<SourceInterface>("SourceInterface", UserResource));

// kernel.bind(new TypeBinding<FooInterface>("FooInterface", Bar));

var userResource = kernel.resolve<UserResource>("SourceInterface");

export function getUserResource(){
  return userResource;
};
