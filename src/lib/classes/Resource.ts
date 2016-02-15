import {IData} from "../interfaces/IData";
import {SerializableModel} from "./SerializableModel";
import {IResource} from "../interfaces/IResource";
import {Promise} from "es6-promise";

export class Resource<M extends SerializableModel> implements IResource<M>{

  model: M;

  //casting of <M>new SerializableModel avoids this: public Model:  { new(): M }
  //as a parameter
  constructor(public data : IData<any>, model? : M){
    this.model = model || this.instantiateNewModel();
  }

  instantiateNewModel() : M{
    return <M>new SerializableModel();
  }

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
            resolve(this.model = SerializableModel.toInstance(this.instantiateNewModel(), success));
          }
        }),
        (failure => reject(failure)));
      });
  }

  getList<R extends Resource<M>>() : Promise<Array<R>>{
    var list : Array<R>;

    return new Promise((resolve, reject) => {
      var resource = <R>new Resource(this.data);
      resource.model.id = 1;

      var resource2 = <R>new Resource(this.data);
      resource.model.id = 2;

      list.push(resource);
      // list.push(resource2);

      resolve(list);
    });
  }

  delete(): Promise<M>{
    //return this.data.delete(this.Reference);
    return null;
  }

  getReferenceIdentifier(overrideId? : any) : any{
      return overrideId || this.model.getIdentifier();
  }

}

//TODO: WIP
export abstract class ResourceList<R extends Resource<SerializableModel>>{
  list: Array<R>;
  resourceReference: string;
  constructor(public data: IData<any>, public resourceModel: { new(data:IData<any>): R }, list? : Object[]){
    if (list.length > 0){
      this.list = new Array<R>();
      list.forEach(pojo => {
        this.list.push(new resourceModel(data));
      });
    }
  }

  save(list? : Array<R>) : Promise<Array<R>>{
    var itemList: Array<R> = list || this.list;
    return new Promise((resolve, reject) => {
      this.data.save(this.resourceReference, itemList, function(data){
        // this.list.push(new this.resourceModel(data))
        resolve(data);
      });
    });
  }

}

export function ModelMap<T>(model:  { new(): T }) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.Model = model;
        return Target;
    };
}
