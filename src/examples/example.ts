import {DefaultApi,LocalStorage} from "./api-example.ts";
import {Resource,ModelMap,Reference} from "../lib/classes/Resource";
import {IModel} from "../lib/interfaces/IModel";


class UserModel implements IModel{

  id: number;

  name: string;

  surname: string;

  // addresses: Array<AddressModel>;
}

@ModelMap(UserModel)
class UserResource<T> extends Resource<UserModel, T>{}

@Reference("/users")
class UserApiResource extends UserResource<Promise<UserModel>>{}



//only one data layer class instance should exist in an app
var api : DefaultApi = new DefaultApi();
var storage : LocalStorage = new LocalStorage();

//Ideally generated from service layer
var User = new UserApiResource(api);

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
// User.getList().then(list => {
//   console.log(list);
// });

//Using local storage
class LocalUserResource extends UserResource<any>{}
//TODO: find a way to eliminate the second generic argument.
//It should automatically "know" what data type is returned from IData class

var LocalUser : LocalUserResource = new LocalUserResource(storage);

var localUserModel : UserModel = new UserModel();
localUserModel.id = 32;
localUserModel.name = "God";
localUserModel.surname = "Almighty";
LocalUser.save(localUserModel);
