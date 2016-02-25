import {SourceInterface} from "./Sourceful";
import {ApiResourceInterface} from "../APILayer/API";
import {Kernel} from "inversify";

export interface RelationalInterface<R extends SourceInterface>{
  getParentBaseUrl() : string;

  one(id?: any) : R;
}

export interface BindingInterface{
  modelPropertyName: string;
  relationalPropertyName: string;
}

export class Relational<R extends ApiResourceInterface> implements RelationalInterface<R>{
  getParentBaseUrl() : string{
    return null;
  }

  ParentReference : ApiResourceInterface;

  constructor(public interfaceName: string, public kernel: Kernel){}

  one(id?: any) : R{
    var newResource = this.kernel.resolve<R>(this.interfaceName);

    if (typeof id !== "undefined"){ //TODO: improve by finding exact identifier type
      newResource.model[newResource.model.getIdentifierProperty()] = id;
    }
    //TODO: somehow need to set parent baseUrl to newResource
    if (typeof newResource.bindings !== "undefined"){
      newResource.bindings.forEach(binding => {
        newResource[binding.relationalPropertyName].ParentReference = newResource;
      });
    }

    // for (var prop in newResource){
    //   if (newResource[prop] instanceof Relational){
    //     if (typeof newResource[prop].interfaceName !== "undefined"){
    //       console.log(newResource[prop].ParentReference = newResource);
    //     }
    //   }
    // }

    if (typeof this.ParentReference !== "undefined"){
      newResource.setParent(this.ParentReference);
      this.ParentReference.bindings.forEach(binding => {
        this.ParentReference.model[binding.modelPropertyName] = newResource.model;
      });
    }
    return newResource;
  }
}

export class Binding implements BindingInterface{
  constructor(public modelPropertyName: string, public relationalPropertyName: string){}
}

export function bindTo(modelPropertyName: string){

  return function <T extends SourceInterface>(target: T, propertyName: string){
    if (typeof target.bindings === "undefined"){
      target.bindings = new Array<Binding>();
    }
    target.bindings.push(new Binding(modelPropertyName, propertyName));
    console.log(modelPropertyName, propertyName);
  };

};
