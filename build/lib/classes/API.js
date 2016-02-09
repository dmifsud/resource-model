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
var es6_promise_1 = require("es6-promise");
var API = (function () {
    function API() {
    }
    API.prototype.getBaseUrl = function () {
        return null;
    };
    return API;
})();
function BaseUrl(url) {
    return function (Target) {
        Target.prototype.getBaseUrl = function () {
            return url;
        };
        return Target;
    };
}
var DefaultApi = (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        _super.call(this);
        this.baseUrl = this.getBaseUrl();
    }
    DefaultApi.prototype.save = function (url, model) {
        console.log("Saving: " + this.baseUrl + url);
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (true) {
                resolve(model);
            }
        });
    };
    DefaultApi.prototype.get = function (url, id) {
        console.log("Getting", this.baseUrl + url + "/" + (id || ""));
        return new es6_promise_1.Promise(function (resolve, reject) {
            var mockModel = {
                id: id || new Date().getTime(),
                name: "David",
                surname: "Mifsud"
            };
            if (true) {
                if (typeof id === "undefined") {
                    resolve([mockModel, {
                            id: new Date().getTime(),
                            name: "John",
                            surname: "Doe"
                        }]);
                }
                else {
                    resolve(mockModel);
                }
            }
        });
    };
    DefaultApi.prototype.delete = function (url) {
        console.log("Deleting", this.baseUrl + url);
        return es6_promise_1.Promise.resolve("Resource <" + url + "> deleted successfuly");
    };
    DefaultApi = __decorate([
        BaseUrl("/your-custom-api-url"), 
        __metadata('design:paramtypes', [])
    ], DefaultApi);
    return DefaultApi;
})(API);
exports.DefaultApi = DefaultApi;
//# sourceMappingURL=API.js.map