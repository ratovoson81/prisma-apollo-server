import { Context } from "../../context";
import { ArgsGetGroupePerUser, ArgsGroupe, Groupe } from "./../../types";

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

      return result;
    },
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
          messages: {
            create: {
              content: "Salut !",
              author: {
                connect: {
                  id: args.data.users[0],
                },
              },
              date: new Date(),
            },
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });
      return newGroupe;
    },
  },
};
