import jwt from "jsonwebtoken";
import {config} from "../config.js";
import nodemailer from "nodemailer";

const createToken = (data) => {
    return jwt.sign(data, config.JWT_SECRET_ID, {
        expiresIn: config.TOKEN_EXP_TIME
    });
};

const verifyToken = (token, tknInvalidCallback, tknValidCallback) => {
    return jwt.verify(token, config.JWT_SECRET_ID, (error, decode) => {
        if (error && typeof tknInvalidCallback === 'function') {
            tknInvalidCallback();
        } else {
            if (typeof tknValidCallback === 'function')
            tknValidCallback(decode);
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

const utils = {
    createToken: createToken,
    verifyToken: verifyToken,
    sendEMail:sendEMail
};

export default utils;