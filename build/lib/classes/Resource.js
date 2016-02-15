var SerializableModel_1 = require("./SerializableModel");
var es6_promise_1 = require("es6-promise");
var Resource = (function () {
    function Resource(data, model) {
        this.data = data;
        this.model = model || this.instantiateNewModel();
    }
    Resource.prototype.instantiateNewModel = function () {
        return new SerializableModel_1.SerializableModel();
    };
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
                    resolve(_this.model = SerializableModel_1.SerializableModel.toInstance(_this.instantiateNewModel(), success));
                }
            }), (function (failure) { return reject(failure); }));
        });
    };
    Resource.prototype.getList = function () {
        var _this = this;
        var list;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var resource = new Resource(_this.data);
            resource.model.id = 1;
            var resource2 = new Resource(_this.data);
            resource.model.id = 2;
            list.push(resource);
            resolve(list);
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
var ResourceList = (function () {
    function ResourceList(data, resourceModel, list) {
        var _this = this;
        this.data = data;
        this.resourceModel = resourceModel;
        if (list.length > 0) {
            this.list = new Array();
            list.forEach(function (pojo) {
                _this.list.push(new resourceModel(data));
            });
        }
    }
    ResourceList.prototype.save = function (list) {
        var _this = this;
        var itemList = list || this.list;
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this.data.save(_this.resourceReference, itemList, function (data) {
                resolve(data);
            });
        });
    };
    return ResourceList;
})();
exports.ResourceList = ResourceList;
function ModelMap(model) {
    return function (Target) {
        Target.prototype.Model = model;
        return Target;
    };
}
exports.ModelMap = ModelMap;
//# sourceMappingURL=Resource.js.map