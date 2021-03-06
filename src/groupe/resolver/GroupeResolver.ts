import { Context } from "../../context";
import {
  ArgsGetGroupeById,
  ArgsGetGroupePerUser,
  ArgsGroupe,
  ArgsMessageView,
} from "./../../types";

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
            skip: args.data.skip,
            take: 20,
            include: {
              author: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });
      result.sort(
        (a: any, b: any) =>
          new Date(b.messages[0]?.date).getTime() -
          new Date(a.messages[0]?.date).getTime()
      );
      return result;
    },
    getOneGroupeById: async (
      _parent: any,
      args: { data: ArgsGetGroupeById },
      context: Context
    ) => {
      return await context.prisma.groupe.findUnique({
        where: {
          id: args.data.idGroupe,
        },
        include: {
          users: {
            include: {
              user: true,
            },
          },
          messages: {
            skip: args.data.skip,
            take: 20,
            include: {
              author: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });
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
      return newGroupe;
    },
    viewMessage: async (
      _parent: any,
      args: { data: ArgsMessageView },
      context: Context
    ) => {
      const result = await context.prisma.groupe.update({
        where: {
          id: args.data.idGroupe,
        },
        data: {
          messages: {
            updateMany: {
              where: {
                authorId: args.data.idUser,
                view: false,
              },
              data: {
                view: true,
                viewAt: new Date(),
              },
            },
          },
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
  },
};
