export interface SerializableInterface{
    getIdentifier() : any;

    fromJSON<M>(json: Object) : M;

    toJSON() : Object;
}
