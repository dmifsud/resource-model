import {Kernel, TypeBinding, TypeBindingScopeEnum} from "inversify";
import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {RequestApi} from "../DataLayer/RequestApi";

var kernel : Kernel;



export class Conf{
  static getKernel() : Kernel{
    if (typeof kernel === "undefined"){
      kernel = new Kernel();
      kernel.bind(new TypeBinding<DataInterface>("DataInterface", RequestApi, TypeBindingScopeEnum.Singleton));
      return kernel;
    }else{
      return kernel;
    }
  }
}
