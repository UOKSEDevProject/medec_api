import mongoose from "mongoose";
import {AuthSchema} from "../schemas/auth-schema.js";

const collectionName = 'auths';

export const AuthModel = mongoose.model(collectionName, AuthSchema);