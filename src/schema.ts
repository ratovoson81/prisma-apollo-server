import { makeExecutableSchema } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import resolvers from "./resolversMap"
import { typeDefs } from "./typeDefs"

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})