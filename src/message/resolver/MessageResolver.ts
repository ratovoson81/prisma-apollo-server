import { Context } from "./../../context";
import { MessageInput } from "../../types";

export const MessageResolvers = {
  Query: {
    message: (_parent: any, _args: any, context: Context) => {
      return context.prisma.message.findMany({});
    },
  },
  Mutation: {
    sendMessage: async (
      _paren: any,
      args: { data: MessageInput },
      context: Context
    ) => {
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
      });
      return newMessage;
    },
  },
  Message: {
    from: (parent: { id: any }, _args: any, context: Context) => {
      return context.prisma.message
        .findUnique({
          where: { id: parent?.id },
        })
        .from();
    },
    to: (parent: { id: any }, _args: any, context: Context) => {
      return context.prisma.message
        .findUnique({
          where: { id: parent?.id },
        })
        .to();
    },
  },
};
