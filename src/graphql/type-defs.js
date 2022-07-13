import {mergeTypeDefs} from "@graphql-tools/merge";
import {chanCenterDefs} from "./type-defs/chan-center-defs.js";
import {doctorDefs} from "./type-defs/doctor-defs.js";
import {sessionDefs} from "./type-defs/session-defs.js";

export const typeDefs = mergeTypeDefs([chanCenterDefs, doctorDefs, sessionDefs]);

