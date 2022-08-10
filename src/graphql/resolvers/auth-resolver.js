import bcrypt from "bcrypt";
import {AuthModel} from "../../database/models/auth-model.js";
import {PatientModel} from "../../database/models/patient-model.js";
import {DoctorModel} from "../../database/models/doctor-model.js";
import constants from "../../constants.js";
import {ChanCenterModel} from "../../database/models/chan-center-model.js";
import {LabModel} from "../../database/models/lab-model.js";

const onLoginCallback = async (resolve, reject, args, authType) => {
    let findUsr = await checkUsrInDB(args);

    if (findUsr && checkTheAuthType(findUsr.type, authType)) {
        await matchThePasswords(resolve, reject, args, findUsr);
    } else {
        reject('no usr invalid user name password');
    }
};

const matchThePasswords = (resolve, reject, args, result) => {
    bcrypt.compare(args.pwd, result.pwd)
        .then((isPwdMatched) => {
            if (isPwdMatched) {
                resolve('completed');
            } else {
                resolve('invalid password');
            }
        })
        .catch((error) => {
            reject(' invalid user name password');
        });
};

const checkUsrInDB = async (args) => {
    return AuthModel.findOne({usrName: args.usr});
};

const onRegisterCallback = async (resolve, reject, args, authType) => {
    let findUsr = await checkUsrInDB(args);

    if (!findUsr) {
        onCreateUserProfile(args, authType, resolve);
    } else {
        reject('usr already registerd');
    }
};

const checkTheAuthType = (type, authType) => {
    return type === authType;
};

const onCreateUserProfile = (args, authType, resolve) => {
    if (authType === constants.authTypeDoctor) {
        onCreateDoctor(args, resolve);
    } else if (authType === constants.authTypeLab) {
        onCreateLab(args, resolve);
    } else if (authType === constants.authTypeAdmin) {

    } else if (authType === constants.authTypePatient) {
        onCreatePatient(args, resolve);
    } else if (authType === constants.authTypeChannelCenter) {
        onCreateChannelCenter(args, resolve);
    }
};

const onSaveInDB = (args, hash, authType, usrId, resolve) => {
    let newUser = {
        usrName: args.usr,
        pwd: hash,
        type: authType,
        usrId: usrId
    };

    AuthModel.create(newUser).then(() => {
        resolve('created');
    });
};

const onCreateHashPassword = (args, authType, usrId, resolve) => {
    bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(args.pwd, salt, (err, hash) => {
            onSaveInDB(args, hash, authType, usrId, resolve);
        });
    });
};

const onCreateDoctor = async (args, resolve) => {
    let doctor = {
        _id: 'casdsdopy',
        fullName: 'args.doctor.fullName',
        disName: 'args.doctor.disName',
        nameWithInitials: 'args.doctor.nameWithInitials',
        cntNo: 'args.doctor.cntN',
        address: 'args.doctor.address',
        spec: 'args.doctor.spec',
        prfImgUrl: 'args.doctor.prfImgUrl',
        email: 'args.doctor.email',
        sex: 'args.doctor.sex',
    };

    DoctorModel.create(doctor).then((doctor) => {
        onCreateHashPassword(args, constants.authTypeDoctor, doctor._id, resolve);
    });
};

const onCreateChannelCenter = (args, resolve) => {
    let chanCenter = {
        name: 'args.chanCenter.name',
        address: 'args.chanCenter.address',
        logoUrl: 'args.chanCenter.logoUrl',
        cntNo: 'args.chanCenter.cntNo'
    };

    ChanCenterModel.create(chanCenter).then((chanCenter) => {
        onCreateHashPassword(args, constants.authTypeChannelCenter, chanCenter._id, resolve);
    });
};

const onCreateLab = (args, resolve) => {
    let lab = {
        name: 'args.chanCenter.name',
        logoUrl: 'args.chanCenter.address',
        cntNo: 'args.chanCenter.logoUrl',
        address: 'args.chanCenter.cntNo'
    };

    LabModel.create(lab).then((lab) => {
        onCreateHashPassword(args, constants.authTypeLab, lab._id, resolve);
    });
};

const onCreatePatient = (args, resolve) => {
    let patient = {
        prfImgUrl: 'args.chanCenter.name',
        address: 'args.chanCenter.address',
        birthDate: 'args.chanCenter.logoUrl',
        des: 'args.chanCenter.cntNo',
        sex: 'args.chanCenter.cntNo',
        cntNo: 'args.chanCenter.cntNo',
        bldGrp: 'scskk',
        mediHis: [],
        disName: 'args.chanCenter.cntNo',
        fullName: 'args.chanCenter.cntNo',
        nameWithInitials: 'args.chanCenter.cntNo'
    };

    PatientModel.create(patient).then((patient) => {
        onCreateHashPassword(args, constants.authTypePatient, patient._id, resolve);
    });
};

export const authResolver = {
    Mutation: {
        login: (parent, args, context) => {
            return new Promise((resolve, reject) => {
                onLoginCallback(resolve, reject, args, context.authType);
            });
        },

        register: (parent, args, context) => {
            return new Promise((resolve, reject) => {
                onRegisterCallback(resolve, reject, args, context.authType);
            });
        }
    }
};