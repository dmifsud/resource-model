import {Kernel} from "inversify";

var kernel : Kernel;

export class Conf{
  static getKernel() : Kernel{
    if (typeof kernel === "undefined"){
      return kernel = new Kernel();
    }else{
      return kernel;
    }
  }
}
