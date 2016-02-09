import {IAPI} from "../interfaces/IAPI";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";



export abstract class Resource<T extends IModel>{
  model: IModel;
  models: Array<IModel>;

  //Annotation references
  public Model : new() => T;
  private Url : string;

  constructor(public api : IAPI){
    this.model = new this.Model();
  }




  //helper methods
  private toInstance(obj: IModel, json: any) : any {

    //return new T();

      for (var propName in json) {
          obj[propName] = json[propName]
      }
      return obj;
  }

  private toJSON(obj: any) : any{
    var jsonObj = {};
    for (var propName in obj){
      jsonObj[propName] = obj[propName];
    }
    return jsonObj;
  }



  save() : Promise<T>{
    return this.api.save(this.Url, this.toJSON(this.model));
  }

  get(id?: number): Promise<T>{

    var id : number = id || this.model.id;

    if (typeof id !== "undefined"){ //TODO: check if model.id is feasible


      return this.api.get(this.Url, id).then((data) => {
          if (this.model.id){
            return this.toInstance(this.model, data);
          }else{
            return this.model = this.toInstance(new this.Model(), data);
          }
      });

    }else{
      throw Error("No id reference found");
    }

  }

  getList(): Promise<Array<IModel>>{
    this.models = new Array<IModel>();

    return this.api.get(this.Url).then(data => {
      data.forEach(item => {
        this.models.push(this.toInstance(new this.Model(), item));
      });
      return this.models;
    });
  }

  delete(): Promise<T>{
    return this.api.delete(this.Url)
      .then(() => this.model);
  }

}

export function ModelMap<T>(model:  { new(): T }) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.Model = model;
        return Target;
    };
}

export function Url(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.Url = url;
        return Target;
    };
}
