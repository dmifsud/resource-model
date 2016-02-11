var ISerializableModel = (function () {
    function ISerializableModel(pojo) {
        if (typeof pojo === "Object") {
            this.toInstance(pojo);
        }
    }
    ISerializableModel.prototype.getIdentifier = function () {
        return this.id;
    };
    ISerializableModel.toInstance = function (obj, json) {
        for (var propName in json) {
            obj[propName] = json[propName];
        }
        return obj;
    };
    ISerializableModel.prototype.toInstance = function (json) {
        return ISerializableModel.toInstance(this, json);
    };
    ISerializableModel.toJSON = function (obj) {
        var jsonObj = {};
        for (var propName in obj) {
            if (typeof obj[propName] !== "function") {
                jsonObj[propName] = obj[propName];
            }
        }
        return jsonObj;
    };
    ISerializableModel.prototype.toJSON = function () {
        return ISerializableModel.toJSON(this);
    };
    return ISerializableModel;
})();
exports.ISerializableModel = ISerializableModel;
//# sourceMappingURL=IModel.js.map