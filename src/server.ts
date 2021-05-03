import typeDefs from "./typeDefs";
import { context } from "./context";
import express from "express";
import resolvers from "./resolversMap";
import { ApolloServer } from "apollo-server-express";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: context,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
);
