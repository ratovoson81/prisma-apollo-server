import typeDefs from "./typeDefs";
import { prisma } from "./context";
import express from "express";
import resolvers from "./resolversMap";
import { ApolloServer } from "apollo-server-express";
import { getUserId } from "./decodedToken";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    prisma,
    req,
  }),
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
);
