import { IResolvers } from "apollo-server-express";
import { merge } from "lodash";
import { MessageResolvers } from "./message/resolver/MessageResolver";
import { PostResolvers } from "./post/resolver/PostResolver";
import { UserResolvers } from "./user/resolver/UserResolver";

const resolverMap: IResolvers = merge(
  PostResolvers,
  UserResolvers,
  MessageResolvers
);
export default resolverMap;
