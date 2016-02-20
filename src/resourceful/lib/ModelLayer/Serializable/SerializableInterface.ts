export interface SerializableInterface{
    getIdentifier() : any;

    toInstance<M>(obj: M, json: Object) : M;

    toJSON() : Object;
}
