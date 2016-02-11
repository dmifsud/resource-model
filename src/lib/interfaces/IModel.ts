export abstract class ISerializableModel {

  id: number; //TODO: check if feasible

  constructor(pojo?: Object){
    if (typeof pojo === "Object"){
      this.toInstance(pojo);
    }
  }

  getIdentifier() : any{
    //TODO: make use of decorator
    // if (typeof this.id === "undefined"){
    //   throw Error("Model reference identifier not found");
    // }else{
      return this.id;
    // }
  }

  static toInstance<M>(obj: M, json: Object) : M {
      for (var propName in json) {
          obj[propName] = json[propName]
      }
      return obj;
  }

  toInstance(json: Object) : ISerializableModel{
    return ISerializableModel.toInstance(this, json);
  }

  static toJSON<M>(obj: M) : Object{
    var jsonObj = {};
    for (var propName in obj){
      if (typeof obj[propName] !== "function"){
          jsonObj[propName] = obj[propName];
      }
    }
    return jsonObj;
  }

  toJSON() : Object{
    return ISerializableModel.toJSON(this);
  }

}
