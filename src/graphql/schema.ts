import {makeExecutableSchema} from "graphql-tools";
import {Query} from "./query";
import {Mutation} from "./mutation";

import {commentTypes} from "./resources/comment/comment.schema";
import {postTypes} from "./resources/post/post.schema";
import {userTypes} from "./resources/user/user.schema";

const SchemaDefinition =  `
  type Schema {
    query: Query
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    commentTypes,
    postTypes,
    userTypes
  ]
});

/**
const users: any[] = [
  {
    id: 1,
    name: 'Jon',
    email: 'jon@email.com'
  },
  {
    id: 2,
    name: 'Dany',
    email: 'dany@email.com'
  }
];

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }
  
  type Query {
    allUsers: [User!]!
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  // User: {
  //   id: (user) => user.id,
  //   name: (user) => user.name,
  //   email: (user) => user.email
  // }, apenas para mostrar como funciona os resolver triviais, que resolvem tipos
  Query: {
    allUsers: () => users
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = Object.assign({id: users.length + 1}, args);
      users.push(newUser);
      return newUser;
    }
  }
};

export default makeExecutableSchema({typeDefs, resolvers}); // o mesmo que fazer makeExecutableSchema({typeDefs: typeDefs, resolvers: resolvers})

 */