import {IData} from "../interfaces/IData";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";



export abstract class Resource<M extends IModel, R>{
  model: M;
  models: Array<M>;

  //Annotation references
  public Model : new() => M;
  private Reference : any;

  constructor(public data : IData<any>){
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

  save(model?: M) : R{
    this.model = model || this.model;
    return this.data.save(this.Reference+this.model.id, () => this.toJSON(this.model));
  }

  get(id?: number): R{

    var id : number = id || this.model.id;

    if (typeof id !== "undefined"){ //TODO: check if model.id is feasible


      return this.data.get(this.Reference+"/"+id, (data) => {
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

  // getList(): Promise<Array<IModel>>{
  //   this.models = new Array<IModel>();
  //
  //   return this.data.get(this.Url).then(data => {
  //     data.forEach(item => {
  //       this.models.push(this.toInstance(new this.Model(), item));
  //     });
  //     return this.models;
  //   });
  // }

  delete(): R{
    return this.data.delete(this.Reference);
  }

}

export function ModelMap<T>(model:  { new(): T }) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.Model = model;
        return Target;
    };
}

export function Reference<T>(ref: T) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.Reference = ref;
        return Target;
    };
}
