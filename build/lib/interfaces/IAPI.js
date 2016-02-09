function BaseUrl(url) {
    return function (Target) {
        Target.prototype.getBaseUrl = function () {
            return this.api.baseURL + url;
        };
        return Target;
    };
}
exports.BaseUrl = BaseUrl;
//# sourceMappingURL=IAPI.js.map