import mongoose from "mongoose";
import {ChanCentersSchema} from "../schemas/chan-centers-schema.js";

const collectionName = 'chan_centers';

export const ChanCenterModel = mongoose.model(collectionName, ChanCentersSchema);