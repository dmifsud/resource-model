import {SourceInterface} from "../../lib/SourceLayer/Sourceful";
import {ApiResource,BaseUrl} from "../../lib/APILayer/API";
import {RelationalInterface, Relational} from "../../lib/SourceLayer/Relational";
import {ModelInterface,Model} from "../../lib/ModelLayer/Model/Model";


import {HobbyModel, HobbyModelInterface} from "../ModelLayer/HobbyModel";
import {Inject,TypeBindingScopeEnum,TypeBinding} from "inversify";
import {Conf} from "./kernel";

var kernel = Conf.getKernel();


export interface HobbySourceInterface extends SourceInterface{}

@BaseUrl("/hobbies")
@Inject("DataInterface", "HobbyModelInterface")
export class HobbyResource extends ApiResource<HobbyModel, HobbySourceInterface> implements HobbySourceInterface{
  //extra implementation

}


export interface HobbyRelationalInterface extends RelationalInterface<HobbyResource>{}

export class HobbyRelational extends Relational<HobbyResource> implements HobbyRelationalInterface{
  constructor(){
    super("HobbySourceInterface", kernel);
  }
}


//hobby bind
kernel.bind(new TypeBinding<ModelInterface>("HobbyModelInterface", HobbyModel, TypeBindingScopeEnum.Transient));

kernel.bind(new TypeBinding<HobbySourceInterface>("HobbySourceInterface", HobbyResource));
