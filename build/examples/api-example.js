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
var API_1 = require("../lib/classes/API");
var es6_promise_1 = require("es6-promise");
var LocalStorage = (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.save = function (reference, data, success, fail) {
        var localStorageReturnVal = localStorage.setItem(reference, JSON.stringify(data));
        if (success) {
            success(localStorageReturnVal);
        }
        return localStorageReturnVal;
    };
    LocalStorage.prototype.update = function (reference, data, success, fail) {
        return this.save(reference, data, success, fail);
    };
    LocalStorage.prototype.get = function (reference, success, fail) {
        var returnedData = JSON.parse(localStorage.getItem(reference));
        if (success) {
            success(returnedData);
        }
        return returnedData;
    };
    LocalStorage.prototype.delete = function (reference, success, fail) {
        return localStorage.removeItem(reference);
    };
    return LocalStorage;
})();
exports.LocalStorage = LocalStorage;
var DefaultApi = (function (_super) {
    __extends(DefaultApi, _super);
    function DefaultApi() {
        _super.call(this);
        this.baseUrl = this.getBaseUrl();
    }
    DefaultApi.prototype.save = function (reference, data, success, fail) {
        console.log("POST: " + this.baseUrl + reference);
        return new es6_promise_1.Promise(function (resolve, reject) {
            var then = function (data) {
                resolve(data);
                success(data);
            }, error = function (data) {
                reject(data);
                fail(data);
            };
            if (true) {
                then(data);
            }
        });
    };
    DefaultApi.prototype.update = function (reference, data, success, fail) {
        console.log("PUT: " + this.baseUrl + reference);
        return new es6_promise_1.Promise(function (resolve, reject) {
            var then = function (data) {
                resolve(data);
                success(data);
            }, error = function (data) {
                reject(data);
                fail(data);
            };
            if (true) {
                then(data);
            }
        });
    };
    DefaultApi.prototype.get = function (reference, success, fail) {
        console.log("GET", this.baseUrl + reference);
        return new es6_promise_1.Promise(function (resolve, reject) {
            var then = function (data) {
                resolve(data);
                success(data);
            }, error = function (data) {
                reject(data);
                fail(data);
            };
            var mockModel = {
                id: reference || new Date().getTime(),
                name: "David",
                surname: "Mifsud"
            };
            if (true) {
                if (typeof reference === "undefined") {
                    then([mockModel, {
                            id: new Date().getTime(),
                            name: "John",
                            surname: "Doe"
                        }]);
                }
                else {
                    then(mockModel);
                }
            }
        });
    };
    DefaultApi.prototype.filter = function (value) {
        return this;
    };
    DefaultApi.prototype.delete = function (urlReference) {
        console.log("DELETE", this.baseUrl + urlReference);
        return es6_promise_1.Promise.resolve("Resource <" + urlReference + "> deleted successfuly");
    };
    DefaultApi = __decorate([
        API_1.BaseUrl("/your-custom-api-url"), 
        __metadata('design:paramtypes', [])
    ], DefaultApi);
    return DefaultApi;
})(API_1.API);
exports.DefaultApi = DefaultApi;
//# sourceMappingURL=api-example.js.map