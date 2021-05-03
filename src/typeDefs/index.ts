import { loadFilesSync, mergeTypeDefs } from "graphql-tools";
import path from "path";

const typesArray = loadFilesSync(path.join(__dirname, "./"), {
  extensions: ["graphql"],
});

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
