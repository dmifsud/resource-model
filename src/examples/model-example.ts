import {SerializableModel} from "../lib/classes/SerializableModel";

export class UserModel extends SerializableModel{

  //@index
  id: number;

  name: string;

  surname: string;

  nickname: string;

  // addresses: Array<AddressModel>;
}
