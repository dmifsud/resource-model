var IModel_1 = require("../interfaces/IModel");
var es6_promise_1 = require("es6-promise");
var Resource = (function () {
    function Resource(data, Model) {
        this.data = data;
        this.Model = Model;
        this.model = new Model();
    }
    Resource.prototype.save = function (model) {
        var _this = this;
        this.model = model || this.model;
        var id = this.getReferenceIdentifier();
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (typeof _this.model.getIdentifier() === "undefined") {
                _this.data.save(id, _this.model.toJSON(), function success(poto) {
                    resolve(this.model);
                }, function fail(msg) {
                    reject(msg);
                });
            }
            else {
                _this.data.update(id, _this.model.toJSON(), function success(poto) {
                    resolve(this.model);
                }, function fail(msg) {
                    reject(msg);
                });
            }
        });
    };
    Resource.prototype.get = function (id) {
        var _this = this;
        var id = this.getReferenceIdentifier(id);
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this.data.get(id, (function (success) {
                if (_this.model.id) {
                    resolve(_this.model.toInstance(success));
                }
                else {
                    resolve(_this.model = IModel_1.ISerializableModel.toInstance(new _this.Model(), success));
                }
            }), (function (failure) { return reject(failure); }));
        });
    };
    Resource.prototype.delete = function () {
        return null;
    };
    Resource.prototype.getReferenceIdentifier = function (overrideId) {
        return overrideId || this.model.getIdentifier();
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