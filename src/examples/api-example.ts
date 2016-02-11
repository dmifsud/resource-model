import {IData} from "../lib/interfaces/IData";
import {API,BaseUrl} from "../lib/classes/API";
import {Promise} from "es6-promise";

export class LocalStorage implements IData<Object>{

  save(reference: string, data: Object, success? : Function, fail?: Function) : any{

    var localStorageReturnVal = localStorage.setItem(reference, JSON.stringify(data));
    if(success){
      success(localStorageReturnVal);
    }
    return localStorageReturnVal;
  }

  get(reference: string, success? : Function, fail?: Function) : Object{
    var returnedData = JSON.parse(localStorage.getItem(reference));
    if (success){
      success(returnedData);
    }
    return returnedData;
  }

  delete(reference: string, success? : Function, fail?: Function): any{
    return localStorage.removeItem(reference);
  }

}


@BaseUrl("/your-custom-api-url")
export class DefaultApi extends API implements IData<Promise<Object>>{

  //This is where we can use something like Restangular
  private baseUrl : string;

  constructor(){
    super();
    this.baseUrl = this.getBaseUrl();
  }

  save(reference: string, data: Object, success? : Function, fail?: Function) : Promise<Object>{
    console.log("Saving: "+this.baseUrl+reference);

    return new Promise((resolve, reject) => {

      if (true) {
        resolve(data);
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });
  }

  get(reference: string, success? : Function, fail?: Function) : Promise<Object>{
    console.log("Getting", this.baseUrl+reference);
    return new Promise((resolve, reject) => {

      var then = function(data){
        resolve(data);
        success(data);
      },
      error = function(data){
        reject(data);
        fail(data);
      };


      var mockModel = { //NOTE: this is a hardcoded mock
        id: reference || new Date().getTime(),
        name: "David",
        surname: "Mifsud"
      };

      if (true) {
        if (typeof reference === "undefined"){
          then([mockModel, {
            id: new Date().getTime(),
            name: "John",
            surname: "Doe"
          }]);
        }else{
          then(mockModel);
        }
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });

  }

  //just a thought experiment
  filter(value : string) : DefaultApi{
    return this;
  }

  delete(urlReference: string) : Promise<Object>{
    console.log("Deleting", this.baseUrl+urlReference);
    return Promise.resolve("Resource <"+urlReference+"> deleted successfuly");
  }

}
