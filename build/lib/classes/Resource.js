var es6_promise_1 = require("es6-promise");
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
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this.data.save(_this.Reference + _this.model.id, _this.toJSON(_this.model), function success(poto) {
                resolve(this.model);
            }, function fail(msg) {
                reject(msg);
            });
        });
    };
    Resource.prototype.get = function (id) {
        var _this = this;
        var id = id || this.model.id;
        if (typeof id !== "undefined") {
            return new es6_promise_1.Promise(function (resolve, reject) {
                _this.data.get(_this.Reference + "/" + id, (function (success) {
                    if (_this.model.id) {
                        resolve(_this.toInstance(_this.model, success));
                    }
                    else {
                        resolve(_this.model = _this.toInstance(new _this.Model(), success));
                    }
                }), (function (failure) { return reject(failure); }));
            });
        }
        else {
            throw Error("No id reference found");
        }
    };
    Resource.prototype.delete = function () {
        return null;
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