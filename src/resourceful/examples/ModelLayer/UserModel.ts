import {Model,index} from "../../lib/ModelLayer/Model/Model";

export class UserModel extends Model{
  @index
  id: number;
  name: string;
  surname: string;
}
