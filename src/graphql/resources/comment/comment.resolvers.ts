import {DbConnectionInterface} from "../../../interfaces/DbConnectionInterface";
import {GraphQLResolveInfo} from "graphql";
import {CommentInstance} from "../../../models/CommentModel";
import {Transaction} from "sequelize";
import {handleError} from "../../../utils/utils";

export const commentResolvers = {

  Comment: {
    user: (comment, args, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.User
        .findById(comment.get('user'))
        .catch(handleError);
    },

    post: (comment, {first = 10, offset = 10}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.Post
        .findById(comment.get('post'))
        .catch(handleError);
    }
  },

  Query: {
    commentsByPost: (parent, {postId, first = 10, offset = 10}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.Comment
        .findAll({
          where: {post: postId},
          limit: first,
          offset: offset
        })
        .catch(handleError);
    },
  },

  Mutation: {
    createComment: (parent, {input}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.Comment
          .create(input, {transaction: t})
      }).catch(handleError);
    },

    updateComment: (parent, {id, input}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Comment
          .findById(id)
          .then((comment: CommentInstance) => {
            if (!comment) throw new Error(`Comment with id ${id} not found!`);
            return comment.update(input, {transaction: t});
          });
      }).catch(handleError);
    },

    deleteComment: (parent, {id}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      id = parseInt(id);
      return db.sequelize.transaction((t: Transaction) => {
        return db.Comment
          .findById(id)
          .then((post: CommentInstance) => {
            if (!post) throw new Error(`Comment with id ${id} not found!`);
            return post.destroy({transaction: t})
              .then((post) => !!post);
          });
      }).catch(handleError);
    }
  }
};