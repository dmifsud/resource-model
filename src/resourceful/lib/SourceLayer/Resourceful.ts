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
