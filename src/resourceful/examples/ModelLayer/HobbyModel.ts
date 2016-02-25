import {Model,index,ModelInterface} from "../../lib/ModelLayer/Model/Model";

export interface HobbyModelInterface extends ModelInterface{}

export class HobbyModel extends Model implements HobbyModelInterface{
  @index
  id: number;
  type: string;
}
