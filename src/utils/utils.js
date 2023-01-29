import jwt from "jsonwebtoken";
import {config} from "../config.js";

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

const utils = {
    createToken: createToken,
    verifyToken: verifyToken
};

export default utils;