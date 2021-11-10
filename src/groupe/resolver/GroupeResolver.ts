import { Context } from "../../context";
import { ArgsGetGroupePerUser, ArgsGroupe } from "./../../types";

export const GroupeResolvers = {
  Query: {
    allGroupe: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.groupe.findMany({
        include: {
          users: {
            include: {
              user: true,
            },
          },
          messages: {
            include: {
              author: true,
            },
          },
        },
      });
    },
    getGroupeByMultipleUsers: async (
      _parent: any,
      args: { data: ArgsGetGroupePerUser },
      context: Context
    ) => {
      const condition: any = [];
      args.data?.ids.forEach((id) =>
        condition.push({
          users: {
            some: {
              user: {
                id: id,
              },
            },
          },
        })
      );
      const result = await context.prisma.groupe.findMany({
        where: {
          AND: condition,
        },
        include: {
          users: {
            include: {
              user: true,
            },
          },
          messages: {
            include: {
              author: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });
      console.log(result);
      return result;
    },
    //si existe setSelectGroupe sinon affiche autre page pour accepter chat
    getOneGroupeById: async (
      _parent: any,
      args: { data: number },
      context: Context
    ) => {
      const a = await context.prisma.groupe.findUnique({
        where: {
          id: args.data,
        },
      });
      console.log(a);
      return a;
    },
  },
  Mutation: {
    createGroupe: async (
      _parent: any,
      args: { data: ArgsGroupe },
      context: Context
    ) => {
      const newGroupe = await context.prisma.groupe.create({
        data: {
          name: args.data.name || "",
          users: {
            create: args.data.users.map((u) => ({
              user: {
                connect: {
                  id: u,
                },
              },
            })),
          },
        },
        include: {
          users: true,
        },
      });
      console.log(newGroupe);
      return newGroupe;
    },
  },
};
