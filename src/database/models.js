import mongoose from "mongoose";
import schemas from "./schemas.js";

const AuthModel = mongoose.model("auth", schemas.AuthSchema);
const ChanCenterModel = mongoose.model(
  "chan_centers",
  schemas.ChanCentersSchema
);
const DoctorsModel = mongoose.model("doctors", schemas.DoctorsSchema);
const LabsModel = mongoose.model("labs", schemas.LabsSchema);
const LabReportsModel = mongoose.model("lab_reports", schemas.LabReportsSchema);
const PatientModel = mongoose.model("patients", schemas.PatientSchema);
const SessionsModel = mongoose.model("sessions", schemas.SessionsSchema);

export default {
  AuthModel: AuthModel,
  ChanCenterModel: ChanCenterModel,
  DoctorsModel: DoctorsModel,
  LabsModel: LabsModel,
  LabReportsModel: LabReportsModel,
  PatientModel: PatientModel,
  SessionsModel: SessionsModel,
};
