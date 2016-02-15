var SerializableModel = (function () {
    function SerializableModel(pojo) {
        if (typeof pojo === "object") {
            this.toInstance(pojo);
        }
    }
    SerializableModel.prototype.getIdentifier = function () {
        return this.id;
    };
    SerializableModel.toInstance = function (obj, json) {
        return json;
    };
    SerializableModel.prototype.toInstance = function (json) {
        for (var propName in json) {
            this[propName] = json[propName];
        }
        return this;
    };
    SerializableModel.toJSON = function (obj) {
        var jsonObj = {};
        for (var propName in obj) {
            if (typeof obj[propName] !== "function") {
                jsonObj[propName] = obj[propName];
            }
        }
        return jsonObj;
    };
    SerializableModel.prototype.toJSON = function () {
        return SerializableModel.toJSON(this);
    };
    return SerializableModel;
})();
exports.SerializableModel = SerializableModel;
//# sourceMappingURL=IModel.js.map