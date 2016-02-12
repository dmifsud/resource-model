import {IData} from "../interfaces/IData";
import {ISerializableModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";

abstract class IResource<M extends ISerializableModel>{
  model: M
  constructor(public data : IData<any>, public Model:  { new(): M }){
    this.model = new Model();
  }
}

export class Resource<M extends ISerializableModel> extends IResource<M>{


  save(model?: M) : Promise<M>{
    this.model = model || this.model;
    var id = this.getReferenceIdentifier();
    return new Promise((resolve, reject) => {

      if (typeof this.model.getIdentifier() === "undefined"){
        //ADD
        this.data.save(id, this.model.toJSON(),
          function success(poto){
            resolve(this.model);
          },
          function fail(msg){
            reject(msg);
          });
      }else{
        //UPDATE
        this.data.update(id, this.model.toJSON(),
          function success(poto){
            resolve(this.model);
          },
          function fail(msg){
            reject(msg);
          });
      }
    });
  }

  get(id?: any): Promise<M>{

    var id : any = this.getReferenceIdentifier(id);

    return new Promise((resolve, reject) => {
      this.data.get(id,
        (success => {
          if (this.model.id){
            resolve(this.model.toInstance(success));
          }else{
            resolve(this.model = ISerializableModel.toInstance(new this.Model(), success));
          }
        }),
        (failure => reject(failure)));
      });
  }

  getList<R extends IResource<M>>() : Promise<Array<R>>{
    var list : Array<R>;

    return new Promise((resolve, reject) => {
      var resource = new Resource<M>(this.data, this.Model);
      resource.model.id = 1;

      var resource2 = new Resource<M>(this.data, this.Model);
      resource.model.id = 2;

      list.push(resource);
      list.push(resource2);

      resolve(list);
    });
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

  getReferenceIdentifier(overrideId? : any) : any{
      return overrideId || this.model.getIdentifier();
  }

}

export function ModelMap<T>(model:  { new(): T }) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.Model = model;
        return Target;
    };
}
