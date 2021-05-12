import { DateTimeResolver } from "graphql-scalars";
import { IResolvers } from "graphql-tools";
import { Context } from "../../context";

export const PostResolvers = {
  Query: {
    postById: (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: { id: args.id || undefined },
      });
    },
  },
  Mutation: {
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
    togglePublishPost: async (
      _parent: any,
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
      _parent: any,
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
    deletePost: (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.post.delete({
        where: { id: args.id },
      });
    },
  },
  DateTime: DateTimeResolver,
  Post: {
    author: (parent: { id: any }, _args: any, context: Context) => {
      return context.prisma.post
        .findUnique({
          where: { id: parent?.id },
        })
        .author();
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
