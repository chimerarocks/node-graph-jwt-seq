import {DbConnectionInterface} from "../../../interfaces/DbConnectionInterface";
import {GraphQLResolveInfo} from "graphql";
import {PostInstance} from "../../../models/PostModel";

export const PostResolvers = {

  Post: {
    author: (post, args, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.User
        .findById(post.get('author'));
    },

    comments: (post, {first = 10, offset = 10}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.Comment
        .findAll({
          where: {post: post.get('id')},
          limit: first,
          offset: offset
        })
    }
  },

  Query: {
    posts: (parent, {first = 10, offset = 10}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.Post
        .findAll({
          limit: first,
          offset: offset
        });
    },
    post: (parent, {id}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
      return db.Post
        .findById(id)
        .then((post: PostInstance) => {
          if (!post) throw new Error(`Post with id ${id} not found!`);
          return post;
        });
    }
  }

};