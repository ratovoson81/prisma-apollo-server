import { IResolvers } from "graphql-tools";
import { merge } from "lodash";
import { PostResolvers } from "./post/resolver/PostResolver";
import { UserResolvers } from "./user/resolver/UserResolver";

const resolverMap: IResolvers = merge(PostResolvers, UserResolvers);
export default resolverMap;
