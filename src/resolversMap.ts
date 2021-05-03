import { merge } from "lodash";
import { PostResolvers } from "./post/resolver/PostResolver";
import { UserResolvers } from "./user/resolver/UserResolver";

const resolverMap = merge(PostResolvers, UserResolvers);
export default resolverMap;
