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
@Reference("/users")
class UserResource extends Resource<UserModel>{}



//only one data layer class instance should exist in an app
var api : DefaultApi = new DefaultApi();
var storage : LocalStorage = new LocalStorage();

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
// User.getList().then(list => {
//   console.log(list);
// });


var LocalUser : UserResource = new UserResource(storage);

var localUserModel : UserModel = new UserModel();
localUserModel.id = 32;
localUserModel.name = "God";
localUserModel.surname = "Almighty";
LocalUser.model = localUserModel;
LocalUser.save();
LocalUser.get().then((user) => console.log('local user is', user));
