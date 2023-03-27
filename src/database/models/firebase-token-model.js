import mongoose from "mongoose";
import {FirebaseTokenSchema} from "../schemas/firebase-token-schema.js";

const collectionName = 'fcm';

export const FirebaseTokenModel = mongoose.model(collectionName, FirebaseTokenSchema);