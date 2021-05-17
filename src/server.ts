import typeDefs from "./typeDefs";
import { prisma } from "./context";
import express from "express";
import resolvers from "./resolversMap";
import { ApolloServer } from "apollo-server-express";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    req,
    prisma,
  }),
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000/graphql`)
);
