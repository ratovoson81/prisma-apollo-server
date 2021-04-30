export const typeDef = `
type User {
    email: String!
    id: Int!
    name: String
    posts: [Post!]!
  }
  input UserCreateInput {
    email: String!
    name: String
    posts: [PostCreateInput!]
  }
  input UserUniqueInput {
    email: String
    id: Int
  }`;
