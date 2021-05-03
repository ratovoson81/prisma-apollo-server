import { schema } from "./schema";
import { context } from "./context";
import express from "express";
import resolvers from "./resolversMap";
import { ApolloServer } from "apollo-server";

new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
);

/*const app = express();
const server = new ApolloServer({
  schema,
  context: context,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
);*/
