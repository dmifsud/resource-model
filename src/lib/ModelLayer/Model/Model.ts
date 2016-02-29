import {SerializableInterface} from "../Serializable/SerializableInterface";

export interface ModelInterface extends SerializableInterface{
  getIdentifier() : any;
  getIdentifierProperty() : any;
}

export abstract class Model implements ModelInterface{
  //TODO: replace with @index
  id: number;

  getIdentifier() : any{
      return null;
  }

  getIdentifierProperty() : string{
    return null;
  }

  static toInstance<M extends ModelInterface>(obj: M, json: Object) : M {
      return <M>json;
  }

  fromJSON<M extends Model>(json: Object) : Model{ //TODO: not completely generic
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
    return Model.toJSON(this);
  }
}


export function index<M extends Model>(target: M, propertyKey: string){

  target.getIdentifier = function() : any{
    return this[propertyKey];
  };

  target.getIdentifierProperty = function() : string{
    return propertyKey;
  }

}
