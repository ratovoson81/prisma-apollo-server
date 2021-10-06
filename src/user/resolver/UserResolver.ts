import { DateTimeResolver } from "graphql-scalars";
import { Context } from "../../context";
import jwt from "jsonwebtoken";
import { destroyToken, getUserId } from "../../decodedToken";
import bcrypt from "bcrypt";

export const UserResolvers = {
  Query: {
    allUsers: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany();
    },
    feed: async (
      _parent: any,
      args: {
        searchString: string;
        skip: number;
        take: number;
        orderBy: PostOrderByUpdatedAtInput;
      },
      context: Context
    ) => {
      //destroyToken(context.req);
      const userId = getUserId(context.req);
      console.log("id", userId);
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
        : {};

      return await context.prisma.post.findMany({
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
      _parent: any,
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
    signupUser: async (
      _parent: any,
      args: { data: UserCreateInput },
      context: Context
    ) => {
      const postData = args.data.posts?.map((post) => {
        return { title: post.title, content: post.content || undefined };
      });

      const newUser = await context.prisma.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          password: bcrypt.hashSync(args.data.password, 3),
          posts: {
            create: postData,
          },
        },
      });
      return {
        token: jwt.sign({ userId: newUser.id }, "supersecret", {
          expiresIn: "7d",
        }),
        email: newUser.email,
        name: newUser.name,
      };
    },
    loginUser: async (
      _parent: any,
      args: { data: UserLoginInput },
      context: Context,
      info: any
    ) => {
      const {
        data: { email, password },
      } = args;
      const theUser = await context.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!theUser) throw new Error("user not found");
      const isMatch = bcrypt.compareSync(password, theUser.password);
      if (!isMatch) throw new Error("incorrect password");

      return {
        token: jwt.sign({ userId: theUser.id }, "supersecret", {
          expiresIn: "7d",
        }),
      };
    },
    logout: (_parent: any, args: {}, context: Context, info: any) => {},
    createDraft: (
      _parent: any,
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
    posts: (parent: { id: any }, _args: any, context: Context) => {
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
  password: string;
  posts?: PostCreateInput[];
}

interface UserLoginInput {
  email: string;
  password: string;
}
