export const typeDef = `
type Post {
    author: User
    content: String
    createdAt: DateTime!
    id: Int!
    published: Boolean!
    title: String!
    updatedAt: DateTime!
    viewCount: Int!
  }
  input PostCreateInput {
    content: String
    title: String!
  }
  input PostOrderByUpdatedAtInput {
    updatedAt: SortOrder!
  }
  `;
