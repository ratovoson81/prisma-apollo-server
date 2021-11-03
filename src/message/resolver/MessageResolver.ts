import { Context } from "./../../context";
import { MessageInput } from "../../types";

export const MessageResolvers = {
  Query: {
    message: (_parent: any, _args: any, context: Context) => {
      return context.prisma.message.findMany({
        include: {
          from: true,
          to: true,
        },
      });
    },
  },
  Mutation: {
    sendMessage: async (
      _paren: any,
      args: { data: MessageInput },
      context: Context
    ) => {
      const userFrom = context.prisma.user.findUnique({
        where: {
          id: args.data.idFrom,
        },
      });
      const userto = context.prisma.user.findUnique({
        where: {
          id: args.data.idTo,
        },
      });
      const newMessage = await context.prisma.message.create({
        data: {
          content: args.data.content,
          from: {
            connect: {
              id: args.data.idFrom,
            },
          },
          to: {
            connect: {
              id: args.data.idTo,
            },
          },
          date: args.data.date,
        },
        include: {
          from: true,
          to: true,
        },
      });
      return newMessage;
    },
  },
};
