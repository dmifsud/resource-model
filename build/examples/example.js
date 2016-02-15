var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api_example_ts_1 = require("./api-example.ts");
var resource_example_1 = require("./resource-example");
var api = new api_example_ts_1.DefaultApi();
var storage = new api_example_ts_1.LocalStorage();
var UsersList = new resource_example_1.UsersApi(api, [{ id: 2, name: "Winston", surname: "Church" }]);
UsersList.list[0].save().then(function (data) {
    console.log(data.name + " " + data.surname + " was saved from list");
});
var UserApiModel = (function (_super) {
    __extends(UserApiModel, _super);
    function UserApiModel() {
        _super.call(this, api);
    }
    return UserApiModel;
})(resource_example_1.UserApi);
var User = new UserApiModel();
User.model.name = "Someone";
User.model.surname = "Cool";
User.save();
User.model.id = 42;
User.get().then(function (data) { return console.log(data); });
console.log('getting this');
User.getList().then(function (data) {
    console.log(data);
    console.log(data[0].model.id);
});
User.get(32).then(function (data) {
    console.log(data);
});
User.model = new resource_example_1.UserModel({ id: 69, name: "Davie", surname: "Jones" });
console.log(User.model);
User.save().then(function (model) {
    console.log(model, model.toJSON());
});
console.log("===== Local Storage ====");
var LocalUser = new resource_example_1.UserResource(storage);
var localUserModel = new resource_example_1.UserModel();
localUserModel.id = 11;
localUserModel.name = "God";
localUserModel.surname = "Almighty";
LocalUser.model = localUserModel;
LocalUser.save();
LocalUser.get().then(function (user) { return console.log('local user is', user); });
//# sourceMappingURL=example.js.map