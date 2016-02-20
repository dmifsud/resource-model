import {Model,index} from "../../lib/ModelLayer/Model/Model";
import {getUserResource} from "./UserResourceExample";
import "reflect-metadata";


var userResource = getUserResource();

console.log(userResource.model.getIdentifier());
userResource.save();
