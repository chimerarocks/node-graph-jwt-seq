import {commentQueries} from "./resources/comment/comment.schema";
import {postQueries} from "./resources/post/post.schema";
import {userMutations} from './resources/user/user.schema';

const Mutation = `
  type Mutation {
    ${commentQueries}
    ${postQueries}
    ${userMutations}
  }
`;

export {
  Mutation
}