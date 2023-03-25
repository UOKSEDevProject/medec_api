import {mergeResolvers} from "@graphql-tools/merge";
import {chanCenterResolver} from "./resolvers/chan-center-resolver.js";
import {sessionResolver} from "./resolvers/session-resolver.js";
import {doctorResolver} from "./resolvers/doctor-resolver.js";
import {patientResolver} from "./resolvers/patient-resolver.js";
import {authResolver} from "./resolvers/auth-resolver.js";
import {labResolver} from "./resolvers/lab-resolver.js";

export const resolvers = mergeResolvers([chanCenterResolver, doctorResolver, sessionResolver, patientResolver, authResolver, labResolver]);
