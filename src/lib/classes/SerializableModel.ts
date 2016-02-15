import {ISerializableModel} from "../interfaces/ISerializableModel";
//NOTE: should be abstract
export class SerializableModel implements ISerializableModel{

  id: number; //TODO: replace with an @indexer

  constructor(pojo?: Object){
    if (typeof pojo === "object"){
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

  static toInstance<M extends SerializableModel>(obj: M, json: Object) : M {
      return <M>json;
  }

  toInstance<M extends SerializableModel>(json: Object) : SerializableModel{
    for (var propName in json) {
        this[propName] = json[propName]
    }
    return this;
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
    return SerializableModel.toJSON(this);
  }
}
