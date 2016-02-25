import {DataInterface} from "../../lib/DataLayer/interfaces/DataInterface";
import {API,BaseUrl} from "../../lib/APILayer/API";



@BaseUrl("http://localhost:3000")
export class RequestApi extends API implements DataInterface{

  //This is where we can use something like Restangular
  private baseUrl : string;

  private httpGetAsync(theUrl : string, callback : Function): void{
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous
      xmlHttp.send(null);
  }

  private httpAsync(theUrl: string, type: string, data: string, callback: Function): void{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(type, theUrl, true);
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(data);
  }

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

      this.httpAsync(this.baseUrl+reference, "POST", JSON.stringify(data), response => {
        then(response);
      });
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

      this.httpAsync(this.baseUrl+reference, "PUT", JSON.stringify(data), response => {
        then(response);
      });
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

      this.httpGetAsync(this.baseUrl+reference, data =>{
        then(JSON.parse(data));
      });

    });

  }

  delete(urlReference: string) : Promise<Object>{
    console.log("DELETE", this.baseUrl+urlReference);
    return Promise.resolve("Resource <"+urlReference+"> deleted successfuly");
  }

}
