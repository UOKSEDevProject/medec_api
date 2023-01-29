const constants = {
    authTypeAdmin: "1",
    authTypeDoctor: "2",
    authTypeLab: "3",
    authTypePatient: "4",
    authTypeChannelCenter: "5",

    authSuccess: 10,
    authFail: 11,
    authRegisteredSuccess: 12,
    authRegisteredFail: 13,

    platformMobile: 1,
    platformWeb: 2,

    messages: {
        invalidUserNamePassword: 'Invalid User Name or Password',
        authenticationSuccess: 'Login Success',
        userExists: 'Username already exists',
        registeredSuccessfully: "Successfully Registered"
    }
};

export const statusCodes = {
    Onsuccess: {
        code: "S0000",
        details: "Success",
    },
    onNewRecordCreatedSuccessfully:{
        code: "S0001",
        details: "New record created successfully",
    },
    OnNotFound: {
        code: "E0001",
        details: "Not found"
    },
    OnUnknownError: {
        code: "E1000",
    }
}

export default constants;