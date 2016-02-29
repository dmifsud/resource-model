import {DataInterface} from "../DataLayer/interfaces/DataInterface";
import {ModelInterface} from "../ModelLayer/Model/Model";
import {Promise} from "es6-promise";
import {BindingInterface,Binding} from "./Relational";

export interface SourceInterface{

  model: ModelInterface;
  data: DataInterface;
  parent: SourceInterface;
  bindings: Array<BindingInterface>;

  save(id: any): Promise<ModelInterface>

  get(id: any): Promise<ModelInterface>

  delete(id: any): Promise<ModelInterface>
}

export abstract class Source<M extends ModelInterface> implements SourceInterface{
  data: DataInterface;
  model: M;
  parent: SourceInterface;
  bindings: Array<BindingInterface>;

  constructor(data: DataInterface, model: M){
    this.data = data;
    this.model = model;
  }

  save(id?: any): Promise<M>{
    console.log('[Source] saving: ' + this.getReferenceIdentifier());
    return new Promise((resolve,reject) => {
      if (typeof id === "undefined" && typeof this.model.getIdentifier() === "undefined"){
        this.data.create(this.getReferenceIdentifier(), this.model.toJSON(), response => {
          resolve(response);
        });
      }else{
        this.data.update(this.getReferenceIdentifier(), this.model.toJSON(), response => {
          resolve(response);
        });
      }
    });
  }

  get(id?: any): Promise<M>{
    return new Promise((resolve,reject) => {
      this.data.get(this.getReferenceIdentifier(), success =>{
        this.model.fromJSON(success);
        resolve(this.model);
      })
    });
  }

  delete(id: any) : Promise<M>{
    return null;
  }

  getReferenceIdentifier(overrideId? : any) : any{
      return overrideId || this.model.getIdentifier();
  }
}
