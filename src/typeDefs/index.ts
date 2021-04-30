import { DateTimeResolver } from "graphql-scalars";
import { makeExecutableSchema } from "graphql-tools";
import { Context } from "../context";
import { typeDef as Post } from "./Post";
import { typeDef as User } from "./User";

const Query = `
type Query {
    allUsers: [User!]!
    draftsByUser(userUniqueInput: UserUniqueInput!): [Post]
    feed(orderBy: PostOrderByUpdatedAtInput, searchString: String, skip: Int, take: Int): [Post!]!
    postById(id: Int): Post
  }
  enum SortOrder {
    asc
    desc
  }
  scalar DateTime
`;

const Mutation = `
type Mutation {
    createDraft(authorEmail: String!, data: PostCreateInput!): Post
    deletePost(id: Int!): Post
    incrementPostViewCount(id: Int!): Post
    signupUser(data: UserCreateInput!): User!
    togglePublishPost(id: Int!): Post
  }`;

const resolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany();
    },
    postById: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id || undefined },
      });
    },
    feed: (
      _parent,
      args: {
        searchString: string;
        skip: number;
        take: number;
        orderBy: PostOrderByUpdatedAtInput;
      },
      context: Context
    ) => {
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
        : {};

      return context.prisma.post.findMany({
        where: {
          published: true,
          ...or,
        },
        take: args?.take,
        skip: args?.skip,
        orderBy: args?.orderBy,
      });
    },
    draftsByUser: (
      _parent,
      args: { userUniqueInput: UserUniqueInput },
      context: Context
    ) => {
      return context.prisma.user
        .findUnique({
          where: {
            id: args.userUniqueInput.id || undefined,
            email: args.userUniqueInput.email || undefined,
          },
        })
        .posts({
          where: {
            published: false,
          },
        });
    },
  },
  Mutation: {
    signupUser: (
      _parent,
      args: { data: UserCreateInput },
      context: Context
    ) => {
      const postData = args.data.posts?.map((post) => {
        return { title: post.title, content: post.content || undefined };
      });

      return context.prisma.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          posts: {
            create: postData,
          },
        },
      });
    },
    createDraft: (
      _parent,
      args: { data: PostCreateInput; authorEmail: string },
      context: Context
    ) => {
      return context.prisma.post.create({
        data: {
          title: args.data.title,
          content: args.data.content,
          author: {
            connect: { email: args.authorEmail },
          },
        },
      });
    },
    togglePublishPost: async (
      _parent,
      args: { id: number },
      context: Context
    ) => {
      try {
        const post = await context.prisma.post.findUnique({
          where: { id: args.id || undefined },
          select: {
            published: true,
          },
        });

        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: { published: !post?.published },
        });
      } catch (error) {
        throw new Error(
          `Post with ID ${args.id} does not exist in the database.`
        );
      }
    },
    incrementPostViewCount: (
      _parent,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.post.update({
        where: { id: args.id || undefined },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    },
    deletePost: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.delete({
        where: { id: args.id },
      });
    },
  },
  DateTime: DateTimeResolver,
  Post: {
    author: (parent, _args, context: Context) => {
      return context.prisma.post
        .findUnique({
          where: { id: parent?.id },
        })
        .author();
    },
  },
  User: {
    posts: (parent, _args, context: Context) => {
      return context.prisma.user
        .findUnique({
          where: { id: parent?.id },
        })
        .posts();
    },
  },
};

enum SortOrder {
  asc = "asc",
  desc = "desc",
}

interface PostOrderByUpdatedAtInput {
  updatedAt: SortOrder;
}

interface UserUniqueInput {
  id?: number;
  email?: string;
}

interface PostCreateInput {
  title: string;
  content?: string;
}

interface UserCreateInput {
  email: string;
  name?: string;
  posts?: PostCreateInput[];
}

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Post, User],
  resolvers,
});
