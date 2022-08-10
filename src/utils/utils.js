import jwt from "jsonwebtoken";
import {config} from "../config.js";

const createToken = (data) => {
    return jwt.sign(data, config.JWT_SECRET_ID, {
        expiresIn: '12h'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET_ID);
};

const utils = {
    createToken: createToken,
    verifyToken: verifyToken
};

export default utils;