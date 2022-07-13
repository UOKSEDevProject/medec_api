import mongoose from "mongoose";
import {SessionSchema} from "../schemas/session-schema.js";

const collectionName = 'sessions';

export const SessionModel = mongoose.model(collectionName, SessionSchema);