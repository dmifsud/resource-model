var Resource = (function () {
    function Resource(data) {
        this.data = data;
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
    Resource.prototype.save = function (model) {
        var _this = this;
        this.model = model || this.model;
        return this.data.save(this.Reference + this.model.id, function () { return _this.toJSON(_this.model); });
    };
    Resource.prototype.get = function (id) {
        var _this = this;
        var id = id || this.model.id;
        if (typeof id !== "undefined") {
            return this.data.get(this.Reference + "/" + id, function (data) {
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
    Resource.prototype.delete = function () {
        return this.data.delete(this.Reference);
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
function Reference(ref) {
    return function (Target) {
        Target.prototype.Reference = ref;
        return Target;
    };
}
exports.Reference = Reference;
//# sourceMappingURL=Resource.js.map