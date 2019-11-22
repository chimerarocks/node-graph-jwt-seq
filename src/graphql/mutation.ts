import {userMutations} from './resources/user/user.schema';
import {postQueries} from "./resources/post/post.schema";

const Mutation = `
  type Mutation {
    ${postQueries}
    ${userMutations}
  }
`;

export {
  Mutation
}