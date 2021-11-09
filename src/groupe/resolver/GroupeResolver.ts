import { Context } from "../../context";
import { ArgsGroupe } from "./../../types";

export const GroupeResolvers = {
  Query: {
    allGroupe: async (
      _parent: any,
      args: { data: ArgsGroupe },
      context: Context
    ) => {
      const result = await context.prisma.groupe.findMany({
        include: {
          users: {
            include: {
              user: true,
            },
          },
        },
      });
      console.log(result[0]);
      console.log(result.length);

      return result;
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
  Groupe: {
    users: (parent: { id: any }, _args: any, context: Context) => {
      return context.prisma.groupe
        .findUnique({
          where: { id: parent?.id },
        })
        .users();
    },
  },
};
