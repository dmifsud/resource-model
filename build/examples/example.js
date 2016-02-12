var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var api_example_ts_1 = require("./api-example.ts");
var Resource_1 = require("../lib/classes/Resource");
var IModel_1 = require("../lib/interfaces/IModel");
var API_1 = require("../lib/classes/API");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        _super.apply(this, arguments);
    }
    return UserModel;
})(IModel_1.ISerializableModel);
var UserApi = (function (_super) {
    __extends(UserApi, _super);
    function UserApi(data) {
        _super.call(this, data, UserModel);
        this.data = data;
    }
    UserApi = __decorate([
        API_1.BaseUrl("/users"), 
        __metadata('design:paramtypes', [Object])
    ], UserApi);
    return UserApi;
})(API_1.ApiResource);
var UserResource = (function (_super) {
    __extends(UserResource, _super);
    function UserResource(data) {
        _super.call(this, data, UserModel);
        this.data = data;
    }
    return UserResource;
})(Resource_1.Resource);
var api = new api_example_ts_1.DefaultApi();
var storage = new api_example_ts_1.LocalStorage();
var User = new UserApi(api);
User.data;
User.model.name = "Someone";
User.model.surname = "Cool";
User.save();
User.model.id = 42;
User.get().then(function (data) { return console.log(data); });
User.getList().then(function (data) {
    console.log(data);
    console.log(data[0].model.name);
});
User.get(32).then(function (data) {
    console.log(data);
});
User.model = UserModel.toInstance(new UserModel(), { id: 69, name: "Davie", surname: "Jones" });
User.save().then(function (model) {
    console.log(model, model.toJSON());
});
console.log("===== Local Storage ====");
var LocalUser = new UserResource(storage);
var localUserModel = new UserModel();
localUserModel.id = 11;
localUserModel.name = "God";
localUserModel.surname = "Almighty";
LocalUser.model = localUserModel;
LocalUser.save();
LocalUser.get().then(function (user) { return console.log('local user is', user); });
//# sourceMappingURL=example.js.map