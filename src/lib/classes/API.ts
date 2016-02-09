import {IAPI} from "../interfaces/IAPI";
import {Promise} from "es6-promise";

class API{
  protected getBaseUrl() : string{
      return null;
  }
}

function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return url;
        };
        return Target;
    };
}

@BaseUrl("/your-custom-api-url")
export class DefaultApi extends API implements IAPI{

  //This is where we can use something like Restangular
  baseUrl : string;

  constructor(){
    super();
    this.baseUrl = this.getBaseUrl();
  }

  save(url: string, model: any) : Promise<any>{
    console.log("Saving: "+this.baseUrl+url);

    return new Promise((resolve, reject) => {

      if (true) {
        resolve(model);
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });
  }

  get(url: string, id? : any) : Promise<any>{
    console.log("Getting", this.baseUrl+url+"/"+(id||""));
    return new Promise((resolve, reject) => {

      var mockModel = { //NOTE: this is a hardcoded mock
        id: id || new Date().getTime(),
        name: "David",
        surname: "Mifsud"
      };

      if (true) {
        if (typeof id === "undefined"){
          resolve([mockModel, {
            id: new Date().getTime(),
            name: "John",
            surname: "Doe"
          }]);
        }else{
          resolve(mockModel);
        }
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });
  }

  delete(url: string) : Promise<any>{
    console.log("Deleting", this.baseUrl+url);
    return Promise.resolve("Resource <"+url+"> deleted successfuly");
  }

}
