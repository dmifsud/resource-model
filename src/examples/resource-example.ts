import {ResourceList,Resource} from "../lib/classes/Resource";
import {ApiResource,BaseUrl} from "../lib/classes/API";
import {IData} from "../lib/interfaces/IData";
import {SerializableModel} from "../lib/classes/SerializableModel";

export class UserModel extends SerializableModel{

  id: number;

  name: string;

  surname: string;

  // addresses: Array<AddressModel>;
}

@BaseUrl("/users")
export class UserApi extends ApiResource<UserModel>{}

export class UsersApi extends ResourceList<UserApi>{
  resourceReference: string = "/users";
  constructor(data: IData<any>, list? : Object[]){
    super(data, UserApi, list);
  }
}


//Plain Resource - Not restricted to just API type data layers
export class UserResource extends Resource<UserModel>{}