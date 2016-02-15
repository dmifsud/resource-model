import {DefaultApi,LocalStorage} from "./api-example.ts";
import {UserModel,UserApi,UsersApi,UserResource} from "./resource-example";


//only one data layer class instance should exist in an app
var api : DefaultApi = new DefaultApi();
var storage : LocalStorage = new LocalStorage();

var UsersList = new UsersApi(api, [{id: 2, name:"Winston", surname: "Church"}]);

// UsersList.save().then(data => {
//   console.log(data[0].model);
// });

UsersList.list[0].save().then(data => {
  console.log(data.name + " " + data.surname + " was saved from list");
});

//Ideally generated from service layer
class UserApiModel extends UserApi{
  constructor(){
    super(api);
  }
}

//Final Result
var User = new UserApiModel();


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

console.log('getting this');
User.getList().then(data => {
  console.log(data);
  console.log(data[0].model.id);
});

//Or it can be directly passed via get
//GET /users/32
User.get(32).then(data => {
  console.log(data);
});

User.model = new UserModel({id: 69, name: "Davie", surname: "Jones"});
console.log(User.model);
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
