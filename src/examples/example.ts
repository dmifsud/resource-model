import {DefaultApi} from "../lib/classes/API";
import {Resource,ModelMap,Url} from "../lib/classes/Resource";
import {IModel} from "../lib/interfaces/IModel";


class UserModel implements IModel{

  id: number;

  name: string;

  surname: string;

  // addresses: Array<AddressModel>;
}

@Url("/users")
@ModelMap(UserModel)
export class UserResource extends Resource<UserModel>{
model: UserModel; //NOTE: probably redundant
models: Array<UserModel>;
}

//only one data layer class instance should exist in an app
var api : DefaultApi = new DefaultApi();

//Ideally generated from service layer
var User = new UserResource(api);


//add custom UserModel
var dave : UserModel = new User.Model();
dave.name = "David";
dave.surname = "Mifsud";
console.log(dave);

//Assumes that User.model contains a valid id
User.model.id = 42;
User.get().then(data => console.log(data)); //User.model is also updated

//Or it can be directly passed via get
User.get(42).then(data => {
  console.log(data);
});

//Getting list of users
User.getList().then(list => {
  console.log(list);
});
