import mongoose from "mongoose";
import {ChanCenterSchema} from "../schemas/chan-center-schema.js";

const collectionName = 'chan_centers';

export const ChanCenterModel = mongoose.model(collectionName, ChanCenterSchema);