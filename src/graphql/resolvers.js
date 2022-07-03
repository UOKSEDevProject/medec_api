import {mergeResolvers} from "@graphql-tools/merge";
import {chanCenterResolver} from "./resolvers/chan-center-resolver.js";

export const resolvers = mergeResolvers([chanCenterResolver]);