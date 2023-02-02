import bcrypt from "bcrypt";
import {AuthModel} from "../../database/models/auth-model.js";
import {PatientModel} from "../../database/models/patient-model.js";
import {DoctorModel} from "../../database/models/doctor-model.js";
import constants from "../../constants.js";
import {ChanCenterModel} from "../../database/models/chan-center-model.js";
import {LabModel} from "../../database/models/lab-model.js";
import utils from "../../utils/utils.js";
import {withFilter} from "graphql-subscriptions";
import {apolloServerConnection} from "../../apollo-server-connection.js";

const onLoginCallback = async (resolve, reject, args, authType) => {
    let findUsr = await checkUsrInDB(args);

    if (findUsr && checkTheAuthType(findUsr.type, authType)) {
        await matchThePasswords(resolve, reject, args, findUsr);
    } else {
        resolve({authSts: constants.authFail, message: constants.messages.invalidUserNamePassword});
    }
};

const matchThePasswords = (resolve, reject, args, result) => {
    bcrypt.compare(args.pwd, result.pwd)
        .then(async (isPwdMatched) => {
            if (isPwdMatched) {
                let data = {usrId: result.usrId, authType: result.type};
                let token = await utils.createToken(data);
                let res = {
                    authSts: constants.authSuccess,
                    authType: result.type,
                    usrId: result.usrId,
                    tkn: token,
                    message: constants.messages.authenticationSuccess
                };

                resolve(res);
            } else {
                resolve({authSts: constants.authFail, message: constants.messages.invalidUserNamePassword});
            }
        })
        .catch((error) => {
            resolve({authSts: constants.authFail, message: constants.messages.invalidUserNamePassword});
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
        resolve({authSts: constants.authRegisteredFail, message: constants.messages.userExists});
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
        resolve({authSts: constants.authRegisteredSuccess, message: constants.messages.registeredSuccessfully});
    });
};

export const onCreateHashPassword = (args, authType, usrId, resolve) => {
    bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(args.pwd, salt, (err, hash) => {
            onSaveInDB(args, hash, authType, usrId, resolve);
        });
    });
};

// const onCreateHashPassword = (args, authType, usrId, resolve) => {
//     bcrypt.genSalt(8, (err, salt) => {
//         bcrypt.hash(args.pwd, salt, (err, hash) => {
//             onSaveInDB(args, hash, authType, usrId, resolve);
//         });
//     });
// };

const onCreateDoctor = async (args, resolve) => {
    let doctor = {
        _id: args.userArgs.doctorArgs._id,
        fullName: args.userArgs.doctorArgs.fullName,
        disName: args.userArgs.doctorArgs.disName,
        nameWithInitials: args.userArgs.doctorArgs.nameWithInitials,
        cntNo: args.userArgs.doctorArgs.cntNo,
        address: args.userArgs.doctorArgs.address,
        spec: args.userArgs.doctorArgs.spec,
        prfImgUrl: args.userArgs.doctorArgs.prfImgUrl,
        email: args.userArgs.doctorArgs.email,
        sex: args.userArgs.doctorArgs.sex
    };

    DoctorModel.create(doctor).then((doctor) => {
        onCreateHashPassword(args, constants.authTypeDoctor, doctor._id, resolve);
    });
};

const onCreateChannelCenter = (args, resolve) => {
    let chanCenter = {
        name: args.userArgs.chanCenterArgs.name,
        address: args.userArgs.chanCenterArgs.address,
        logoUrl: args.userArgs.chanCenterArgs.logoUrl,
        cntNo: args.userArgs.chanCenterArgs.cntNo
    };

    ChanCenterModel.create(chanCenter).then((chanCenter) => {
        onCreateHashPassword(args, constants.authTypeChannelCenter, chanCenter._id, resolve);
    });
};

const onCreateLab = (args, resolve) => {
    let lab = {
        name: args.userArgs.labArgs.name,
        logoUrl: args.userArgs.labArgs.logoUrl,
        cntNo: args.userArgs.labArgs.cntNo,
        address: args.userArgs.labArgs.address
    };

    LabModel.create(lab).then((lab) => {
        onCreateHashPassword(args, constants.authTypeLab, lab._id, resolve);
    });
};

const onCreatePatient = (args, resolve) => {
    let patient = {
        prfImgUrl: args.userArgs.patientArgs.prfImgUrl,
        address: args.userArgs.patientArgs.address,
        birthDate: args.userArgs.patientArgs.birthDate,
        des: args.userArgs.patientArgs.des,
        sex: args.userArgs.patientArgs.sex,
        cntNo: args.userArgs.patientArgs.cntNo,
        bldGrp: args.userArgs.patientArgs.bldGrp,
        mediHis: [],
        disName: args.userArgs.patientArgs.disName,
        fullName: args.userArgs.patientArgs.fullName,
        nameWithInitials: args.userArgs.patientArgs.nameWithInitials
    };

    PatientModel.create(patient).then((patient) => {
        utils.sendEMail(args.usr,'Successfully Registered',`Hi ${patient.disName},
        Welcome to Medec (Your online medical assistant)`);
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
    },

    Subscription: {
        authListener: {
            resolve: (payload) => {
                return payload
            },

            subscribe: withFilter(
                () => {
                    return apolloServerConnection.pubsub.asyncIterator(["AUTH_LISTENER"]);
                },
                (payload, args) => {return true}
            )
        }
    }
};