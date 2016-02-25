import { TypeBinding, Kernel, TypeBindingScopeEnum , Inject} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {ModelInterface, Model, index} from "../../lib/ModelLayer/Model/Model";
import {API,BaseUrl,ApiResource,} from "../../lib/APILayer/API";
import {RequestApi} from "../DataLayer/RequestApi";
import {SourceInterface} from "../../lib/SourceLayer/Sourceful";
import {Resource} from "../../lib/SourceLayer/Resourceful";
import {RelationalInterface, Relational, bindTo} from "../../lib/SourceLayer/Relational";
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
    this.hobby = hobby;
  }

  @bindTo("hobby")
  hobby: HobbyRelationalInterface;
}

export interface UserRelationalInterface extends RelationalInterface<UserResource>{}

class UserRelational extends Relational<UserResource> implements UserRelationalInterface{
  constructor(){
    super("UserSourceInterface", kernel);
  }
}

// // bind
kernel.bind(new TypeBinding<ModelInterface>("ModelInterface", UserModel, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<DataInterface>("DataInterface", RequestApi, TypeBindingScopeEnum.Singleton));
kernel.bind(new TypeBinding<UserSourceInterface>("UserSourceInterface", UserResource));

//relations
kernel.bind(new TypeBinding<HobbyRelationalInterface>("HobbyRelationalInterface", HobbyRelational, TypeBindingScopeEnum.Transient));
kernel.bind(new TypeBinding<UserRelationalInterface>("UserRelationalInterface", UserRelational, TypeBindingScopeEnum.Transient));

export class User{
  static getUserApiResource() : UserRelational{
    return kernel.resolve<UserRelational>("UserRelationalInterface");
  }
}
