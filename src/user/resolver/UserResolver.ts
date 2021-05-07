import { DateTimeResolver } from "graphql-scalars";
import { IResolvers } from "graphql-tools";
import { Context } from "../../context";
import jwt from "jsonwebtoken";

export const UserResolvers: IResolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany();
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
          token: jwt.sign("newUser", "supersecret"),
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
  },
  DateTime: DateTimeResolver,
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
