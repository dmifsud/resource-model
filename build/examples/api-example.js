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
    LocalStorage.prototype.save = function (reference, dataLogic) {
        localStorage.setItem(reference, JSON.stringify(dataLogic()));
    };
    LocalStorage.prototype.get = function (reference, dataLogic) {
        var returnedData = JSON.parse(localStorage.getItem(reference));
        return dataLogic(returnedData);
    };
    LocalStorage.prototype.delete = function (reference) {
        localStorage.removeItem(reference);
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
    DefaultApi.prototype.save = function (referenceUrl, dataLogic) {
        console.log("Saving: " + this.baseUrl + referenceUrl);
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (true) {
                resolve(dataLogic());
            }
        });
    };
    DefaultApi.prototype.get = function (referenceUrl, dataLogic) {
        console.log("Getting", this.baseUrl + referenceUrl);
        var getPromise = new es6_promise_1.Promise(function (resolve, reject) {
            var mockModel = {
                id: referenceUrl || new Date().getTime(),
                name: "David",
                surname: "Mifsud"
            };
            if (true) {
                if (typeof referenceUrl === "undefined") {
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
        return getPromise.then(function (data) { return dataLogic(data); });
    };
    DefaultApi.prototype.delete = function (urlReference) {
        console.log("Deleting", this.baseUrl + urlReference);
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