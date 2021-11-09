import { Message, MessageChat } from "./../../types";
import { Context } from "./../../context";
import { ArgsMessageChat, MessageInput } from "../../types";

export const MessageResolvers = {
  Query: {
    message: (_parent: any, _args: any, context: Context) => {
      return context.prisma.message.findMany({});
    },
    messageByUser: (
      _parent: any,
      args: { data: ArgsMessageChat },
      context: Context
    ) => {
      return context.prisma.message.findMany({
        where: {
          /*fromUserId: args.data.idFrom,
          toUserId: args.data.idTo,*/
        },
      });
    },
    /*getChat: async (
      _parent: any,
      args: { data: ArgsMessageChat },
      context: Context
    ) => {
      return await context.prisma.message.findMany({
        where: {
          OR: [
            {
              fromUserId: args.data.idFrom,
              toUserId: args.data.idTo,
            },
            { fromUserId: args.data.idTo, toUserId: args.data.idFrom },
          ],
        },
        orderBy: {
          date: "asc",
        },
      });
    },*/
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
          author: {
            connect: {
              id: args.data.idFrom,
            },
          },
          groupe: {
            connect: {
              id: args.data.idGroupe,
            },
          },
          date: args.data.date,
        },
      });
      console.log(newMessage);
      return newMessage;
    },
  },
  Message: {
    author: (parent: { id: any }, _args: any, context: Context) => {
      return context.prisma.message
        .findUnique({
          where: { id: parent?.id },
        })
        .author();
    },
  },
};
