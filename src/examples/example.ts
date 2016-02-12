import {DefaultApi,LocalStorage} from "./api-example.ts";
import {Resource,ModelMap} from "../lib/classes/Resource";
import {ISerializableModel} from "../lib/interfaces/IModel";
import {IData} from "../lib/interfaces/IData";
import {ApiResource,BaseUrl} from "../lib/classes/API";



class UserModel extends ISerializableModel{

  id: number;

  name: string;

  surname: string;

  // addresses: Array<AddressModel>;
}

@BaseUrl("/users")
class UserApi extends ApiResource<UserModel>{
    constructor(public data: IData<any>){
      super(data, UserModel);
    }
}



//Plain Resource - Not restricted to just API type data layers
class UserResource extends Resource<UserModel>{
  constructor(public data: IData<any>){
    super(data, UserModel);
  }
}


//only one data layer class instance should exist in an app
var api : DefaultApi = new DefaultApi();
var storage : LocalStorage = new LocalStorage();

//Ideally generated from service layer
var User = new UserApi(api);
User.data
//add custom UserModel
// var dave : UserModel = new User.Model();
// dave.name = "David";
// dave.surname = "Mifsud";
// console.log(dave);
User.model.name = "Someone";
User.model.surname = "Cool";
//POST /users
User.save();

User.model.id = 42;
//GET /users/42
User.get().then(data => console.log(data)); //User.model is also updated

User.getList().then(data => {
  console.log(data);
  console.log(data[0].model.name);
});

//Or it can be directly passed via get
//GET /users/32
User.get(32).then(data => {
  console.log(data);
});

User.model = UserModel.toInstance(new UserModel(),{id: 69, name: "Davie", surname: "Jones"});
//PUT /users/69
User.save().then(model => {
  console.log(model, model.toJSON());
});

//Getting list of users
// User.getList().then(list => {
//   console.log(list);
// });

console.log("===== Local Storage ====");
var LocalUser : UserResource = new UserResource(storage);

var localUserModel : UserModel = new UserModel();
localUserModel.id = 11;
localUserModel.name = "God";
localUserModel.surname = "Almighty";
LocalUser.model = localUserModel;
LocalUser.save();
LocalUser.get().then((user) => console.log('local user is', user));
