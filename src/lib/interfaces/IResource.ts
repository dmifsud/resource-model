import {ISerializableModel} from "./ISerializableModel";
import {IData} from "./IData";
import {Promise} from "es6-promise";

export interface IResource<M extends ISerializableModel>{
  model: M;
  data: IData<any>;

  save();
  save(model: M) : Promise<M>

  get();
  get(id: any): Promise<M>

  delete();
  delete(id: any): Promise<M>

}
