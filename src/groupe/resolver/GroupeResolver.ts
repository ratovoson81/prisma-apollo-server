import { Context } from "../../context";
import { ArgsGroupe } from "./../../types";

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
