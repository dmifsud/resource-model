var API = (function () {
    function API() {
    }
    API.prototype.getBaseUrl = function () {
        return null;
    };
    return API;
})();
exports.API = API;
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