import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {API,BaseUrl} from "../../lib/APILayer/API";

@BaseUrl("/your-resourceful-api")
export class DefaultApi extends API implements DataInterface{

  //This is where we can use something like Restangular
  private baseUrl : string;

  constructor(){
    super();
    this.baseUrl = this.getBaseUrl();
  }

  create(reference: string, data: Object, success? : Function, fail?: Function) : Promise<Object>{
    console.log("POST: "+this.baseUrl+reference);

    return new Promise((resolve, reject) => {
      var then = function(data){
        resolve(data);
        success(data);
      },
      error = function(data){
        reject(data);
        fail(data);
      };

      if (true) {
        then(data);
      }
    });
  }

  update(reference: string, data: Object, success? : Function, fail?: Function) : Promise<Object>{
    console.log("PUT: "+this.baseUrl+reference);

    return new Promise((resolve, reject) => {
      var then = function(data){
        resolve(data);
        success(data);
      },
      error = function(data){
        reject(data);
        fail(data);
      };

      if (true) {
        then(data);
      }
    });
  }

  get(reference: string, success? : Function, fail?: Function) : Promise<Object>{
    console.log("GET", this.baseUrl+reference);
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
        id: new Date().getTime(),
        name: "Davy",
        surname: "Jones"
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

  delete(urlReference: string) : Promise<Object>{
    console.log("DELETE", this.baseUrl+urlReference);
    return Promise.resolve("Resource <"+urlReference+"> deleted successfuly");
  }

}
