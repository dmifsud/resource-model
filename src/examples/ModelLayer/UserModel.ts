import {Model,index} from "../../lib/ModelLayer/Model/Model";
import {HobbyModel} from "./HobbyModel";

export class UserModel extends Model{
  @index
  id: number;
  name: string;
  surname: string;
  hobby: HobbyModel
}
