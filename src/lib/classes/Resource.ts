import {IData} from "../interfaces/IData";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";



export abstract class Resource<M extends IModel>{
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

  save(model?: M) : Promise<M>{
    this.model = model || this.model;
    return new Promise((resolve, reject) => {
      this.data.save(this.Reference+this.model.id, this.toJSON(this.model),
        function success(poto){
          resolve(this.model);
        },
        function fail(msg){
          reject(msg);
        });
    });
  }

  get(id?: number): Promise<M>{

    var id : number = id || this.model.id;

    if (typeof id !== "undefined"){ //TODO: check if model.id is feasible

      return new Promise((resolve, reject) => {
        this.data.get(this.Reference+"/"+id,
          (success => {
            if (this.model.id){
              resolve(this.toInstance(this.model, success));
            }else{
              resolve(this.model = this.toInstance(new this.Model(), success));
            }
          }),
          (failure => reject(failure)));
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

  delete(): Promise<M>{
    //return this.data.delete(this.Reference);
    return null;
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
