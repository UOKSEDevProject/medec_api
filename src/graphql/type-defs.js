import {mergeTypeDefs} from "@graphql-tools/merge";
import {chanCenterDefs} from "./type-defs/chan-center-defs.js";

export const typeDefs = mergeTypeDefs([chanCenterDefs]);