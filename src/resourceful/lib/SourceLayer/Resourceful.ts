import {SourceInterface} from "./Sourceful";
import {Kernel} from "inversify";

export abstract class Resource<S extends SourceInterface>{
  container: S;

  constructor(containerResourceName: string, kernel : Kernel){
    var newResource = kernel.resolve<S>(containerResourceName);
    this.container = newResource;
  }

  static one<R extends SourceInterface>(interfaceName: string, kernel: Kernel, id? : any): R{
    var newResource = kernel.resolve<R>(interfaceName);

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    return newResource;
  }
}

// import {DataInterface} from "../DataLayer/interfaces/DataInterface";
// import {ModelInterface} from "../ModelLayer/Model/Model";
// import {Promise} from "es6-promise";
//
// export interface ResourceInterface{
//
//   model: ModelInterface;
//   data: DataInterface;
//
//   save(id: any): Promise<ModelInterface>
//
//   get(id: any): Promise<ModelInterface>
//
//   delete(id: any): Promise<ModelInterface>
// }
//
// export abstract class Resource<M extends ModelInterface> implements ResourceInterface{
//   data: DataInterface;
//   model: M;
//
//   constructor(data: DataInterface, model: M){
//     this.data = data;
//     this.model = model;
//   }
//
//   save(id?: any): Promise<M>{
//     console.log('[Source] saving: ' + this.getReferenceIdentifier());
//     this.data.update(this.getReferenceIdentifier(), this.model.toJSON());
//     return null;
//   }
//
//   get(id: any): Promise<M>{
//     return null;
//   }
//
//   delete(id: any) : Promise<M>{
//     return null;
//   }
//
//   getReferenceIdentifier(overrideId? : any) : any{
//       return overrideId || this.model.getIdentifier();
//   }
// }
