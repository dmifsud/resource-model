import {IData} from "../lib/interfaces/IData";
import {API,BaseUrl} from "../lib/classes/API";
import {Promise} from "es6-promise";

export class LocalStorage implements IData<any>{

  save(reference: string, dataLogic : Function) : void{
    localStorage.setItem(reference, JSON.stringify(dataLogic()));
  }

  get(reference: string, dataLogic: Function) : any{
    var returnedData = JSON.parse(localStorage.getItem(reference));
    return dataLogic(returnedData);
  }

  delete(reference: string): void{
    localStorage.removeItem(reference);
  }

}


@BaseUrl("/your-custom-api-url")
export class DefaultApi extends API implements IData<Promise<any>>{

  //This is where we can use something like Restangular
  private baseUrl : string;

  constructor(){
    super();
    this.baseUrl = this.getBaseUrl();
  }

  save(referenceUrl: string, dataLogic: Function) : Promise<any>{
    console.log("Saving: "+this.baseUrl+referenceUrl);

    return new Promise((resolve, reject) => {

      if (true) {
        resolve(dataLogic());
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });
  }

  get(referenceUrl: string, dataLogic: Function) : Promise<any>{
    console.log("Getting", this.baseUrl+referenceUrl);
    var getPromise = new Promise((resolve, reject) => {



      var mockModel = { //NOTE: this is a hardcoded mock
        id: referenceUrl || new Date().getTime(),
        name: "David",
        surname: "Mifsud"
      };

      if (true) {
        if (typeof referenceUrl === "undefined"){
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

    return getPromise.then(data => dataLogic(data));

  }

  delete(urlReference: string) : Promise<any>{
    console.log("Deleting", this.baseUrl+urlReference);
    return Promise.resolve("Resource <"+urlReference+"> deleted successfuly");
  }

}
