import { ApolloServer } from "apollo-server";
import { schema } from "./typeDefs";
import { context } from "./context";

new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
);
