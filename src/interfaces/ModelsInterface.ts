/**
 * O Objetivo dessa interface é que o possamos aproveitar o IntelliSense da IDE para saber quais os models existem na aplicaçao
 */
import {CommentModel} from "../models/CommentModel";
import {PostModel} from "../models/PostModel";
import {UserModel} from "../models/UserModel";

export interface ModelsInterface {
  /**
   * Importante deixar em ordem alfabetica
   */
  Comment: CommentModel,
  Post: PostModel,
  User: UserModel

}
