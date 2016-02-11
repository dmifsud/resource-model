var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Resource_1 = require("./Resource");
var API = (function () {
    function API() {
    }
    API.prototype.getBaseUrl = function () {
        return null;
    };
    return API;
})();
exports.API = API;
var ApiResource = (function (_super) {
    __extends(ApiResource, _super);
    function ApiResource() {
        _super.apply(this, arguments);
    }
    ApiResource.prototype.getBaseUrl = function () {
        return null;
    };
    ApiResource.prototype.getReferenceIdentifier = function (overrideId) {
        return this.getBaseUrl() + "/" + (_super.prototype.getReferenceIdentifier.call(this, overrideId) || "");
    };
    return ApiResource;
})(Resource_1.Resource);
exports.ApiResource = ApiResource;
function BaseUrl(url) {
    return function (Target) {
        Target.prototype.getBaseUrl = function () {
            return url;
        };
        return Target;
    };
}
exports.BaseUrl = BaseUrl;
//# sourceMappingURL=API.js.map