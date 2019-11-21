/**
 * O Objetivo dessa interface é que o possamos aproveitar o IntelliSense da IDE para saber quais os models existem na aplicaçao
 */
import {UserModel} from "../models/UserModel";
import {PostModel} from "../models/PostModel";

export interface ModelsInterface {

  User: UserModel,
  Post: PostModel

}