var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IModel_1 = require("../interfaces/IModel");
var es6_promise_1 = require("es6-promise");
var IResource = (function () {
    function IResource(data, Model) {
        this.data = data;
        this.Model = Model;
        this.model = new Model();
    }
    return IResource;
})();
var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        _super.apply(this, arguments);
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
    Resource.prototype.getList = function () {
        var _this = this;
        var list;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var resource = new Resource(_this.data, _this.Model);
            resource.model.id = 1;
            var resource2 = new Resource(_this.data, _this.Model);
            resource.model.id = 2;
            list.push(resource);
            list.push(resource2);
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
})(IResource);
exports.Resource = Resource;
function ModelMap(model) {
    return function (Target) {
        Target.prototype.Model = model;
        return Target;
    };
}
exports.ModelMap = ModelMap;
//# sourceMappingURL=Resource.js.map