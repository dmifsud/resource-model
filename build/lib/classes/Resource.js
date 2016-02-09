var Resource = (function () {
    function Resource(api) {
        this.api = api;
        this.model = new this.Model();
    }
    Resource.prototype.toInstance = function (obj, json) {
        for (var propName in json) {
            obj[propName] = json[propName];
        }
        return obj;
    };
    Resource.prototype.toJSON = function (obj) {
        var jsonObj = {};
        for (var propName in obj) {
            jsonObj[propName] = obj[propName];
        }
        return jsonObj;
    };
    Resource.prototype.save = function () {
        return this.api.save(this.Url, this.toJSON(this.model));
    };
    Resource.prototype.get = function (id) {
        var _this = this;
        var id = id || this.model.id;
        if (typeof id !== "undefined") {
            return this.api.get(this.Url, id).then(function (data) {
                if (_this.model.id) {
                    return _this.toInstance(_this.model, data);
                }
                else {
                    return _this.model = _this.toInstance(new _this.Model(), data);
                }
            });
        }
        else {
            throw Error("No id reference found");
        }
    };
    Resource.prototype.getList = function () {
        var _this = this;
        this.models = new Array();
        return this.api.get(this.Url).then(function (data) {
            data.forEach(function (item) {
                _this.models.push(_this.toInstance(new _this.Model(), item));
            });
            return _this.models;
        });
    };
    Resource.prototype.delete = function () {
        var _this = this;
        return this.api.delete(this.Url)
            .then(function () { return _this.model; });
    };
    return Resource;
})();
exports.Resource = Resource;
function ModelMap(model) {
    return function (Target) {
        Target.prototype.Model = model;
        return Target;
    };
}
exports.ModelMap = ModelMap;
function Url(url) {
    return function (Target) {
        Target.prototype.Url = url;
        return Target;
    };
}
exports.Url = Url;
//# sourceMappingURL=Resource.js.map