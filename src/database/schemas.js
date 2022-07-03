import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  usrName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  pwd: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  usrId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const ChanCentersSchema = new mongoose.Schema({
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  cntNo: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  logoUrl: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const DoctorsSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  cntNo: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  spec: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  prfImgUrl: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const LabReportsSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  lId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  pId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  imgPath: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const LabsSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  logoUrl: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  cntNo: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const MediHistorySchema = mongoose.Schema({
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  dct: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  imgPath: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const PatientSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  prfImgUrl: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  birthDate: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  bldGrp: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  des: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  sex: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  cntNo: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  mediHis: [
    {
      type: MediHistorySchema,
    },
  ],
});

const AptsSchema = mongoose.Schema({
  aptNo: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  pId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  pName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  activeSt: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const SessionsSchema = new mongoose.Schema({
  dctId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  chId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  strTime: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  maxApts: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  totApts: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  curAptNo: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  apts: [
    {
      type: AptsSchema,
    },
  ],
});

export default {
  AuthSchema: AuthSchema,
  ChanCentersSchema: ChanCentersSchema,
  DoctorsSchema: DoctorsSchema,
  LabReportsSchema: LabReportsSchema,
  LabsSchema: LabsSchema,
  PatientSchema: PatientSchema,
  SessionsSchema: SessionsSchema,
};
