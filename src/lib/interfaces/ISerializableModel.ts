export interface ISerializableModel {
  getIdentifier() : any;

  toInstance<M>(obj: M, json: Object) : M;

  toJSON() : Object;
}
