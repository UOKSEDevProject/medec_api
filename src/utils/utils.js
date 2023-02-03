import jwt from "jsonwebtoken";
import {config} from "../config.js";
import nodemailer from "nodemailer";
import {apolloServerConnection} from "../apollo-server-connection.js";
import constants from "../constants.js";

const createToken = (data) => {
    return jwt.sign(data, config.JWT_SECRET_ID, {
        expiresIn: config.TOKEN_EXP_TIME
    });
};

const verifyToken = (token, usrId, authType, tknInvalidCallback, tknValidCallback) => {
    return jwt.verify(token, config.JWT_SECRET_ID, (error, decode) => {
        if (error && typeof tknInvalidCallback === 'function') {
            tknInvalidCallback();
        } else {
            if (typeof tknValidCallback === 'function')
            tknValidCallback(decode, usrId, authType);
        }
    });
};

const sendEMail = (to,subject,body) => {
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'medec.srilanka@gmail.com',
            pass: 'osnjkxygctxutyik'
        }
    }).sendMail({
        from: 'medec.srilanka@gmail.com',
        to: to,
        subject: subject,
        text: body
    });
}

const makePassword = async () => {
    let result = '';
    let length=8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
}

const sendAuthLogoutResponse = () => {
    apolloServerConnection.pubsub.publish("AUTH_LISTENER", {authSts: constants.authLogout});
}

const utils = {
    createToken: createToken,
    verifyToken: verifyToken,
    sendEMail: sendEMail,
    makePassword: makePassword,
    sendAuthLogoutResponse: sendAuthLogoutResponse
};

export default utils;